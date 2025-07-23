const session = require('express-session')
require('dotenv').config()
const { SESSION_DURATION_MS } = require('../config/constants')

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: SESSION_DURATION_MS }
})

function guard(req, res, next) {
    if (!req.session.userId) return res.status(401).end()
    next()
}

module.exports = { sessionMiddleware, guard }
