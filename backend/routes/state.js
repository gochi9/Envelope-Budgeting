const express = require('express')
const db = require('../db/dblite')
const { MIN_AMOUNT, SOCKET_ROOM_PREFIX } = require('../config/constants')
const { guard } = require('../session/session')

module.exports = io => {
    const router = express.Router()

    router.get('/state', guard, (req, res) => {
        const uid = req.session.userId
        db.get('SELECT amount FROM income WHERE user_id = ?', [uid], (err, income) => {
            db.all('SELECT * FROM envelopes WHERE user_id = ? ORDER BY order_index ASC', [uid], (e2, envs) => {
                res.json({
                    income: (income?.amount ?? 0).toFixed(2),
                    envelopes: envs.map(e => ({ ...e, amount: e.amount.toFixed(2) }))
                })
            })
        })
    })

    router.post('/income', guard, (req, res) => {
        const amt = +req.body.amount
        if (amt < MIN_AMOUNT) return res.status(400).end()

        const uid = req.session.userId
        db.run('UPDATE income SET amount = amount + ? WHERE user_id = ?', [amt, uid], () => {
            io.to(`${SOCKET_ROOM_PREFIX}${uid}`).emit('refresh')
            res.end()
        })
    })

    return router
}
