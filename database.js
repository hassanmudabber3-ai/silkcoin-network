const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database(
    "./silkcoin.db",
    (err)=>{

        if(err){

            console.log(err);

        }else{

            console.log("Silkcoin Database Connected");

        }

    }
);




db.serialize(()=>{


db.run(`

CREATE TABLE IF NOT EXISTS users(

id INTEGER PRIMARY KEY AUTOINCREMENT,

username TEXT UNIQUE,

password TEXT,

balance REAL DEFAULT 0,

mining_start INTEGER DEFAULT 0,

mining_end INTEGER DEFAULT 0

)

`);



});




module.exports = db;
