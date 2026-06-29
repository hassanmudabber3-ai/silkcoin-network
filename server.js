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





// ---------------------
// Register
// ---------------------

app.post("/api/register",(req,res)=>{


const username =
req.body.username;


const password =
req.body.password;



if(!username || !password){


return res.json({

success:false,

message:"Fill all fields"

});


}





db.run(

`

INSERT INTO users
(username,password)

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

message:"Account created",

id:this.lastID

});




}



);



});







// ---------------------
// Login
// ---------------------


app.post("/api/login",(req,res)=>{


const username =
req.body.username;


const password =
req.body.password;





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



if(err || !user){



return res.json({

success:false,

message:"Wrong login"

});


}




res.json({

success:true,

user:user

});




}



);



});








// ---------------------
// Count Users
// ---------------------


app.get("/api/users",(req,res)=>{


db.get(

`

SELECT COUNT(*) AS total

FROM users

`,



(err,row)=>{


res.json({

users:row.total

});



}



);



});








// ---------------------
// Get User Balance
// ---------------------


app.get("/api/user/:id",(req,res)=>{


let id =
req.params.id;



db.get(

`

SELECT *

FROM users

WHERE id=?

`,

[id],


(err,row)=>{


res.json(row);



}



);



});








app.listen(3000,()=>{


console.log(

"Silkcoin Server Running on 3000"

);


});
