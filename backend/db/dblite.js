const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('budget.db')

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, passwordHash TEXT)')
    db.run('CREATE TABLE IF NOT EXISTS income(user_id INTEGER PRIMARY KEY, amount REAL)')
    db.run('CREATE TABLE IF NOT EXISTS envelopes(id INTEGER PRIMARY KEY, user_id INTEGER, name TEXT, amount REAL, order_index INTEGER)')
})

module.exports = db
