const express = require('express')
const db = require('../db/dblite')
const { MIN_AMOUNT, SOCKET_ROOM_PREFIX } = require('../config/constants')
const { guard } = require('../session/session')

module.exports = io => {
    const router = express.Router()

    router.post('/move', guard, (req, res) => {
        const { id, amount } = req.body
        const amt = +amount
        if (amt < MIN_AMOUNT) return res.status(400).end()

        const uid = req.session.userId
        db.get('SELECT amount FROM income WHERE user_id = ?', [uid], (e, row) => {
            if (row.amount < amt) return res.status(400).end()

            db.serialize(() => {
                db.run('UPDATE income SET amount = amount - ? WHERE user_id = ?', [amt, uid])
                db.run('UPDATE envelopes SET amount = amount + ? WHERE id = ? AND user_id = ?', [amt, id, uid], () => {
                    io.to(`${SOCKET_ROOM_PREFIX}${uid}`).emit('refresh')
                    res.end()
                })
            })
        })
    })

    router.post('/spend', guard, (req, res) => {
        const { id, amount } = req.body
        const amt = +amount
        if (amt < MIN_AMOUNT) return res.status(400).end()

        const uid = req.session.userId
        db.get('SELECT amount FROM envelopes WHERE id = ? AND user_id = ?', [id, uid], (e, row) => {
            if (!row || row.amount < amt) return res.status(400).end()

            db.run('UPDATE envelopes SET amount = amount - ? WHERE id = ? AND user_id = ?', [amt, id, uid], () => {
                io.to(`${SOCKET_ROOM_PREFIX}${uid}`).emit('refresh')
                res.end()
            })
        })
    })

    router.post('/take', guard, (req, res) => {
        const { id, amount } = req.body
        const amt = +amount
        if (amt < MIN_AMOUNT) return res.status(400).end()

        const uid = req.session.userId
        db.get('SELECT amount FROM envelopes WHERE id = ? AND user_id = ?', [id, uid], (e, row) => {
            if (!row || row.amount < amt) return res.status(400).end()

            db.serialize(() => {
                db.run('UPDATE envelopes SET amount = amount - ? WHERE id = ? AND user_id = ?', [amt, id, uid])
                db.run('UPDATE income SET amount = amount + ? WHERE user_id = ?', [amt, uid], () => {
                    io.to(`${SOCKET_ROOM_PREFIX}${uid}`).emit('refresh')
                    res.end()
                })
            })
        })
    })

    router.post('/envelope', guard, (req, res) => {
        const name = req.body.name
        const uid = req.session.userId
        db.run('INSERT INTO envelopes (name, amount, user_id) VALUES (?, ?, ?)', [name, 0, uid], () => {
            io.to(`${SOCKET_ROOM_PREFIX}${uid}`).emit('refresh')
            res.sendStatus(200)
        })
    })

    router.delete('/envelope/:id', guard, (req, res) => {
        const uid = req.session.userId
        db.run('DELETE FROM envelopes WHERE id = ? AND user_id = ?', [req.params.id, uid], () => {
            io.to(`${SOCKET_ROOM_PREFIX}${uid}`).emit('refresh')
            res.sendStatus(200)
        })
    })

    router.post('/reorder', guard, (req, res) => {
        const uid = req.session.userId
        const ids = req.body.newOrder
        const stmt = db.prepare('UPDATE envelopes SET order_index = ? WHERE id = ? AND user_id = ?')
        ids.forEach((id, index) => {
            stmt.run(index, id, uid)
        })
        stmt.finalize(() => {
            io.to(`${SOCKET_ROOM_PREFIX}${uid}`).emit('refresh')
            res.sendStatus(200)
        })
    })

    return router
}
