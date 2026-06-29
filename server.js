const express = require("express");

const path = require("path");

const db = require("./database");


const app = express();



app.use(express.json());


app.use(

express.static(

path.join(__dirname,"public")

)

);





// Register

app.post("/api/register",(req,res)=>{


let username=req.body.username;

let password=req.body.password;



db.run(

`

INSERT INTO users(username,password)

VALUES(?,?)

`,

[
username,
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








// Login


app.post("/api/login",(req,res)=>{


let username=req.body.username;

let password=req.body.password;



db.get(

`

SELECT *

FROM users

WHERE username=?

AND password=?

`,

[
username,
password
],


(err,user)=>{


if(!user){

return res.json({

success:false

});

}



res.json({

success:true,

user:user

});



}

);


});








// Spin information


app.get("/api/spin/:id",(req,res)=>{


db.get(

`

SELECT spin_count

FROM users

WHERE id=?

`,

[req.params.id],


(err,row)=>{


res.json({

spins:row.spin_count

});


}


);



});









// Watch Ad


app.post("/api/spin/ad",(req,res)=>{


let id=req.body.id;



db.get(

`

SELECT spin_count

FROM users

WHERE id=?

`,

[id],


(err,user)=>{


if(user.spin_count>=5){


return res.json({

success:false,

message:"Limit reached"

});


}




res.json({

success:true

});


});



});








// Spin reward


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

message:"No spin"

});


}



let rewards=[

0.5,

1,

2,

5,

10

];



let reward=

rewards[

Math.floor(

Math.random()*rewards.length

)

];





db.run(

`

UPDATE users

SET

balance = balance + ?,

spin_count = spin_count + 1

WHERE id=?

`,

[reward,id],



()=>{


res.json({

success:true,

reward:reward

});



}

);



});



});









app.listen(3000,()=>{


console.log(

"Silkcoin Server Running"

);


});
