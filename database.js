const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database(
"./silkcoin.db"
);



db.serialize(()=>{


db.run(`

CREATE TABLE IF NOT EXISTS users(

id INTEGER PRIMARY KEY AUTOINCREMENT,

username TEXT UNIQUE,

password TEXT,

recovery TEXT,

balance REAL DEFAULT 0,

mining_start INTEGER DEFAULT 0,

mining_end INTEGER DEFAULT 0,

spin_count INTEGER DEFAULT 0

)

`);





db.run(`

CREATE TABLE IF NOT EXISTS transactions(

id INTEGER PRIMARY KEY AUTOINCREMENT,

user_id INTEGER,

type TEXT,

amount REAL,

created INTEGER

)

`);





});




module.exports=db;
