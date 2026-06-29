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

message:"Username exists"

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



(err,row)=>{


if(!row){


return res.json({

success:false

});


}



res.json({

success:true,

user:row

});


}



);


});








// تعداد کاربران شبکه


app.get("/api/users",(req,res)=>{


db.get(

`

SELECT COUNT(*) total

FROM users

`,

(err,row)=>{


res.json({

users:row.total

});


});


});








// شروع استخراج


app.post("/api/startMining",(req,res)=>{


let id=req.body.id;



let end =

Date.now()
+
(24*60*60*1000);




db.run(

`

UPDATE users

SET mining_start=?,

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








// اطلاعات کاربر


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








// پایان ماین و اضافه کردن درآمد


app.post("/api/claim",(req,res)=>{


let id=req.body.id;



db.get(

`

SELECT *

FROM users

WHERE id=?

`,

[id],



(err,user)=>{



if(!user){

return res.json({

success:false

});

}




if(Date.now() < user.mining_end){


return res.json({

success:false,

message:"Mining not finished"

});


}




let usersCount=0;



db.get(

`

SELECT COUNT(*) total

FROM users

`,


(err,row)=>{


usersCount=row.total;




let rate;



if(usersCount < 10000){

rate=2;

}

else if(usersCount <100000){

rate=1.2;

}

else if(usersCount <1000000){

rate=0.5;

}

else{

rate=0.1;

}





db.run(

`

UPDATE users

SET balance = balance + ?,

mining_start=0,

mining_end=0

WHERE id=?

`,

[rate,id],



()=>{


res.json({

success:true,

reward:rate

});


}



);





});


});



});








app.listen(3000,()=>{


console.log(

"Silkcoin Server Running"

);


});
