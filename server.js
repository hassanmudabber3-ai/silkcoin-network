const express=require("express");

const path=require("path");

const db=require("./database");


const app=express();


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

message:"Username already exists"

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




if(user.password !== password){


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









// RECOVERY PASSWORD


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



function(err){



if(this.changes===0){


return res.json({

success:false,

message:"Recovery failed"

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

"Silkcoin Running"

);


});
