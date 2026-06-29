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
.innerHTML=data.wallet;



document.getElementById("balance")
.innerHTML=

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
.innerHTML=

"⛏ "+data.message;



startTimer();



});


}








function startTimer(){



let time = 24*60*60;



let timer =

setInterval(()=>{


let h =
Math.floor(time/3600);



let m =
Math.floor(
(time%3600)/60
);



let s =
time%60;



document.getElementById("mineMsg")
.innerHTML =

"⛏ Mining: "
+h+"h "
+m+"m "
+s+"s";



time--;



if(time<0){


clearInterval(timer);



document.getElementById("mineMsg")
.innerHTML=

"✅ Claim Reward";


}


},1000);



}









function spin(){



let wheel =
document.querySelector(".wheel");



wheel.style.animation =
"spin 1s linear";



fetch(

"/api/spin?id="+user_id

)



.then(r=>r.json())


.then(data=>{


document.getElementById("spinMsg")
.innerHTML=

"🎉 Won "
+data.reward+
" SCN";



loadUser();



});


}
