const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db/dblite')
const { MIN_PASSWORD_LENGTH, RATE_LIMIT_COUNT, RATE_LIMIT_TIME } = require('../config/constants')

const router = express.Router()
const attempts = new Map()

router.post('/register', async (req, res) => {
    const name = String(req.body.username || '').toLowerCase()
    const pass = String(req.body.password || '')

    if (!name || !pass)
        return res.status(400).end()

    if (pass.length < MIN_PASSWORD_LENGTH)
        return res.status(400).send('short')

    db.get('SELECT 1 FROM users WHERE username = ?', [name], async (_, row) => {
        if (row) return res.status(409).end()

        const hash = await bcrypt.hash(pass, 12)
        db.run('INSERT INTO users(username,passwordHash) VALUES(?,?)', [name, hash], function () {
            const uid = this.lastID
            db.run('INSERT INTO income(user_id,amount) VALUES(?,0)', [uid], () => {
                req.session.userId = uid
                res.sendStatus(200)
            })
        })
    })
})

router.post('/login', (req, res) => {
    const ip = req.ip
    const now = Date.now()
    const rec = attempts.get(ip) || { count: 0, ts: now }

    if (rec.count >= RATE_LIMIT_COUNT && now - rec.ts < RATE_LIMIT_TIME)
        return res.status(429).end()

    if (now - rec.ts > RATE_LIMIT_TIME) {
        rec.count = 0
        rec.ts = now
    }

    const name = String(req.body.username || '').toLowerCase()
    const pass = String(req.body.password || '')

    if (pass.length < MIN_PASSWORD_LENGTH){
        rec.count++
        attempts.set(ip, rec)
        return res.status(400).send('short')
    }

    db.get('SELECT id,passwordHash FROM users WHERE username = ?', [name], async (_, row) => {
        if (!row) {
            rec.count++
            attempts.set(ip, rec)
            return res.status(401).end()
        }

        const ok = await bcrypt.compare(pass, row.passwordHash)

        if (!ok) {
            rec.count++
            attempts.set(ip, rec)
            return res.status(401).end()
        }

        attempts.delete(ip)
        req.session.userId = row.id
        res.sendStatus(200)
    })
})

router.get('/me', (req, res) => {
    if (!req.session.userId)
        return res.status(401).end()

    res.sendStatus(200)
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => res.sendStatus(200))
})

module.exports = router
