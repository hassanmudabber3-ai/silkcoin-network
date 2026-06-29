const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const db = require("./database");

const app = express();


app.use(bodyParser.json());

app.use(express.static(
    path.join(__dirname,"public")
));





// =======================
// HOME
// =======================


app.get("/",(req,res)=>{

res.sendFile(

path.join(
__dirname,
"public",
"login.html"

)

);

});







// =======================
// REGISTER
// =======================


app.post("/api/register",(req,res)=>{


let {
telegram_id,
password

}=req.body;



db.run(

`

INSERT INTO users

(
telegram_id,
password
)

VALUES (?,?)

`,

[
telegram_id,
password
],


function(err){


if(err){


return res.json({

success:false,

message:"User exists"

});


}




res.json({

success:true,

id:this.lastID

});



}

);



});







// =======================
// LOGIN
// =======================


app.post("/api/login",(req,res)=>{


let {
telegram_id,
password

}=req.body;




db.get(

`

SELECT *

FROM users

WHERE telegram_id=?

AND password=?

`,

[
telegram_id,
password
],



(err,user)=>{



if(!user){


return res.json({

success:false,

message:"Wrong password"

});


}



res.json({

success:true,

user:user

});




}

);



});







// =======================
// MINING START 24 HOURS
// =======================


app.post("/api/mining/start",(req,res)=>{


let id=req.body.id;


let now=Date.now();


let end=

now +

(24*60*60*1000);





db.run(

`

UPDATE users

SET

mining_start=?,

mining_end=?

WHERE id=?

`,

[

now,

end,

id

]

);



res.json({

success:true,

end:end

});



});








// =======================
// MINING STATUS
// =======================


app.get("/api/mining/:id",(req,res)=>{


db.get(

`

SELECT *

FROM users

WHERE id=?

`,

[req.params.id],


(err,user)=>{



let remain=

user.mining_end -

Date.now();




if(remain<0)

remain=0;




let mined=

remain>0 ?

((24*60*60*1000-remain)

/(60*60*1000))*2

:0;





res.json({

remain:remain,

mined:mined.toFixed(4)

});



}



);


});








// =======================
// LUCKY SPIN
// =======================


app.post("/api/spin",(req,res)=>{


let id=req.body.id;




db.get(

`

SELECT *

FROM users

WHERE id=?

`,

[id],

(err,user)=>{



if(user.spin_count>=5){


return res.json({

success:false,

message:"No spins left"

});


}





let reward=

(Number(
(Math.floor(Math.random()*10)+1)

)*0.5);





db.run(

`

UPDATE users

SET

balance=balance+?,

spin_count=spin_count+1

WHERE id=?

`,

[
reward,
id

]

);





db.run(

`

INSERT INTO transactions

(

telegram_id,

type,

amount,

created

)

VALUES(?,?,?,?)

`,

[

user.telegram_id,

"LUCKY_SPIN",

reward,

Date.now()

]

);





res.json({

success:true,

reward:reward

});



});



});









// =======================
// WALLET
// =======================


app.get(

"/api/wallet/:id",

(req,res)=>{



db.get(

`

SELECT *

FROM users

WHERE id=?

`,

[req.params.id],


(err,user)=>{



res.json(user);



}

);



});






app.get(

"/api/history/:telegram_id",

(req,res)=>{


db.all(

`

SELECT *

FROM transactions

WHERE telegram_id=?

ORDER BY id DESC

`,

[req.params.telegram_id],


(err,data)=>{


res.json(data);


}


);



});









const PORT=

process.env.PORT || 10000;



app.listen(PORT,()=>{


console.log(

"Silkcoin Server Running"

);


});
