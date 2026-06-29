const tg = window.Telegram.WebApp;


tg.expand();



let user_id = null;



let device_id =
localStorage.getItem("device_id");



if(!device_id){


device_id =
crypto.randomUUID();



localStorage.setItem(

"device_id",

device_id

);


}







function login(){



if(!tg.initDataUnsafe.user){


document.getElementById("error")
.innerHTML =
"Open from Telegram";


return;

}





user_id =
tg.initDataUnsafe.user.id;





fetch(

"/api/login?id="+user_id+

"&device="+device_id

)



.then(r=>r.json())


.then(data=>{



if(data.error){


document.getElementById("error")
.innerHTML=data.error;


return;


}





document.getElementById("login")
.classList.add("hide");



document.getElementById("dashboard")
.classList.remove("hide");




loadUser();



});



}










function loadUser(){



fetch(

"/api/user?id="+user_id

)



.then(r=>r.json())


.then(data=>{


document.getElementById("wallet")
.innerHTML =

data.wallet;



document.getElementById("balance")
.innerHTML =

data.balance+" SCN";



});



}









function startMining(){



fetch(

"/api/mine/start?id="+user_id

)



.then(r=>r.json())


.then(data=>{


document.getElementById("mineMsg")
.innerHTML =

"⛏ "+data.message;


});



}









function spin(){



let wheel =

document.querySelector(".wheel");



wheel.style.animation=

"spin 1s linear";




fetch(

"/api/spin?id="+user_id

)



.then(r=>r.json())


.then(data=>{


document.getElementById("spinMsg")
.innerHTML=

"🎉 Won "+data.reward+" SCN";



loadUser();


});



}
