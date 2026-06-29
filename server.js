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




// REGISTER

app.post("/api/register",(req,res)=>{


let {

username,

password,

recovery

}=req.body;



db.run(

`

INSERT INTO users

(username,password,recovery)

VALUES(?,?,?)

`,

[

username,

password,

recovery

],



function(err){



if(err){

return res.json({

success:false,

message:"Username exists"

});

}



res.json({

success:true

});


}


);


});









// LOGIN


app.post("/api/login",(req,res)=>{


let {

username,

password

}=req.body;




db.get(

`

SELECT *

FROM users

WHERE username=?

`,

[username],



(err,user)=>{



if(!user){

return res.json({

success:false,

message:"User not found"

});

}




if(user.password!==password){


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








// USER INFO


app.get("/api/user/:id",(req,res)=>{


db.get(

`

SELECT *

FROM users

WHERE id=?

`,

[req.params.id],



(err,row)=>{


res.json(row);


}



);



});








// COUNT USERS


app.get("/api/users",(req,res)=>{


db.get(

`

SELECT COUNT(*) total

FROM users

`,


(err,row)=>{


res.json(row);


}


);



});










// START MINING


app.post("/api/startMining",(req,res)=>{


let id=req.body.id;



let end =

Date.now()

+

86400000;




db.run(

`

UPDATE users

SET

mining_start=?,

mining_end=?

WHERE id=?

`,

[

Date.now(),

end,

id

],



()=>{


res.json({

success:true,

end:end

});


}



);



});











// SPIN INFO


app.get("/api/spin/:id",(req,res)=>{


db.get(

`

SELECT spin_count

FROM users

WHERE id=?

`,

[req.params.id],



(err,row)=>{


res.json(row);


}


);


});








// WATCH AD


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

message:"Limit 5 spins"

});


}



res.json({

success:true

});



});



});









// DO SPIN


app.post("/api/spin",(req,res)=>{


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

success:false

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





db.serialize(()=>{


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

(user_id,type,amount,created)

VALUES(?,?,?,?)

`,

[

id,

"LUCKY_SPIN",

reward,

Date.now()

]

);



});







res.json({

success:true,

reward:reward

});





});


});









// HISTORY


app.get("/api/history/:id",(req,res)=>{


db.all(

`

SELECT *

FROM transactions

WHERE user_id=?

ORDER BY id DESC

`,

[req.params.id],



(err,rows)=>{


res.json(rows);


}


);


});









// RECOVERY


app.post("/api/recover",(req,res)=>{


let {

username,

recovery,

newPassword

}=req.body;



db.run(

`

UPDATE users

SET password=?

WHERE username=?

AND recovery=?

`,

[

newPassword,

username,

recovery

],



function(){


if(this.changes===0){


return res.json({

success:false,

message:"Failed"

});


}




res.json({

success:true,

message:"Password changed"

});


}



);



});









app.listen(3000,()=>{


console.log(

"Silkcoin Server Running"

);


});
