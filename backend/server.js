const express = require('express')
const http = require('http')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { CLIENT_BASE } = require('./config/constants')

const { sessionMiddleware } = require('./session/session')
const initSocket = require('./session/socket')

const authRouter = require('./routes/auth')
const createStateRouter = require('./routes/state')
const createEnvelopesRouter = require('./routes/envelopes')

const app = express()
const server = http.createServer(app)
const io = initSocket(server, sessionMiddleware)

const port = process.env.PORT || 3000

app.use(cors({ origin: CLIENT_BASE, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(sessionMiddleware)

app.use(authRouter)
app.use(createStateRouter(io))
app.use(createEnvelopesRouter(io))

server.listen(port)
