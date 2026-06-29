const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database(
"silkcoin.db"
);



db.run(`

CREATE TABLE IF NOT EXISTS users (

id INTEGER PRIMARY KEY AUTOINCREMENT,

telegram_id TEXT UNIQUE,

wallet TEXT UNIQUE,

balance REAL DEFAULT 100,

referrer TEXT,

referrals INTEGER DEFAULT 0

)

`);



module.exports = db;
