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


document.getElementById("loginMsg")
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


document.getElementById("loginMsg")
.innerHTML=data.error;


return;


}





document.getElementById("login")
.classList.add("hidden");



document.getElementById("panel")
.classList.remove("hidden");



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
.innerHTML=data.wallet;


document.getElementById("balance")
.innerHTML=
data.balance+" SCN";



});


}









function startMine(){


fetch(

"/api/mine/start?id="+user_id

)



.then(r=>r.json())


.then(data=>{


document.getElementById("msg")
.innerHTML=data.message;


});


}










function spin(){



fetch(

"/api/spin?id="+user_id

)



.then(r=>r.json())


.then(data=>{


document.getElementById("msg")
.innerHTML=
"🎉 "+data.reward+" SCN";


loadUser();


});


}
