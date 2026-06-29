const express = require("express");

const cors = require("cors");

const db = require("./database");


const app = express();


app.use(cors());

app.use(express.json());


app.use(express.static("public"));





// Register User

app.post("/register",(req,res)=>{


let telegram_id =
req.body.telegram_id;


let referrer =
req.body.referrer || null;



let wallet =

"SILK" +

telegram_id;





db.run(

`

INSERT OR IGNORE INTO users

(telegram_id,wallet,referrer)

VALUES (?,?,?)

`,

[
telegram_id,
referrer,
referrer
],


()=>{



db.get(

`

SELECT * FROM users

WHERE telegram_id=?

`,

[telegram_id],

(err,row)=>{


res.json(row);


}


);



}



);



});








// Get Wallet


app.get("/wallet/:wallet",(req,res)=>{


db.get(

`

SELECT * FROM users

WHERE wallet=?

`,

[req.params.wallet],


(err,row)=>{


res.json(row);


}


);


});







// Send Coin


app.post("/send",(req,res)=>{


let from =
req.body.from;


let to =
req.body.to;


let amount =
Number(req.body.amount);



let fee = 0.0002;




db.get(

"SELECT * FROM users WHERE wallet=?",

[from],

(sender)=>{



if(!sender || sender.balance < amount+fee){


return res.json({

error:"Not enough balance"

});


}





db.get(

"SELECT * FROM users WHERE wallet=?",

[to],

(receiver)=>{


if(!receiver){


return res.json({

error:"Receiver not found"

});


}




db.run(

`

UPDATE users

SET balance=balance-?

WHERE wallet=?

`,

[
amount+fee,
from
]

);




db.run(

`

UPDATE users

SET balance=balance+?

WHERE wallet=?

`,

[
amount,
to
]

);



res.json({

success:true,

fee:fee

});



});



});



});







app.listen(3000,()=>{


console.log(
"Silkcoin Server Running"
);


});
