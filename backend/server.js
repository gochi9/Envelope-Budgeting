const express = require('express')
//using nginx reverse proxy
const http = require('http')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { CLIENT_BASE, PORT } = require('./config/constants')

const { sessionMiddleware } = require('./session/session')
const { Server } = require('socket.io')
const initSocket = require('./session/socket')

const authRouter = require('./routes/auth')
const createStateRouter = require('./routes/state')
const createEnvelopesRouter = require('./routes/envelopes')

const app = express()
const server = http.createServer(app)
const io = initSocket(server, sessionMiddleware)

app.use(cors({ origin: CLIENT_BASE, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.set('trust proxy', true)
app.use(sessionMiddleware)

app.use(authRouter)
app.use(createStateRouter(io))
app.use(createEnvelopesRouter(io))

server.listen(PORT)