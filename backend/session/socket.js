const { Server } = require('socket.io')
const db = require('../db/dblite')
const { CLIENT_BASE, SOCKET_ROOM_PREFIX } = require('../config/constants')

function sendState(socket, uid) {
    db.get('SELECT amount FROM income WHERE user_id = ?', [uid], (e, income) => {
        db.all('SELECT * FROM envelopes WHERE user_id = ? ORDER BY order_index ASC', [uid], (e2, envs) => {
            socket.emit('state', {
                income: (income?.amount ?? 0).toFixed(2),
                envelopes: envs.map(e => ({ ...e, amount: e.amount.toFixed(2) }))
            })
        })
    })
}

function initSocket(server, sessionMiddleware) {
    const io = new Server(server, { cors: { origin: CLIENT_BASE, credentials: true } })

    io.use((socket, next) => sessionMiddleware(socket.request, {}, next))
    io.use((socket, next) => {
        if (!socket.request.session.userId)
            return next(new Error('unauth'))

        next()
    })

    io.on('connection', socket => {
        const uid = socket.request.session.userId
        socket.join(`${SOCKET_ROOM_PREFIX}${uid}`)
        socket.on('getState', () => sendState(socket, uid))
    })

    return io
}

module.exports = initSocket
