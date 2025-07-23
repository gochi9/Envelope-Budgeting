module.exports = {
    CLIENT_BASE: 'https://envelope-budgeting-ppko.onrender.com',
    PORT: 3001,
   // CLIENT_BASE: 'http://localhost:5173',
    MIN_PASSWORD_LENGTH: 8,
    RATE_LIMIT_COUNT: 5,
    RATE_LIMIT_TIME: 60 * 1000,
    SESSION_DURATION_MS: 24 * 60 * 60 * 1000,
    SOCKET_ROOM_PREFIX: 'u',
    MIN_AMOUNT: 0.01
}