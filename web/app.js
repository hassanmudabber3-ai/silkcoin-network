// ============================
// Silkcoin Network App.js
// ============================


let balance = 0;
let mining = false;
let miningTimer = null;



// ============================
// Telegram Login
// ============================


function login(){


if(window.Telegram && Telegram.WebApp){


let user = Telegram.WebApp.initDataUnsafe.user;


if(user){


document.getElementById("wallet").innerHTML =
"TG ID: " + user.id;


showDashboard();


}else{


document.getElementById("error").innerHTML =
"Telegram user not found";


}


}else{


document.getElementById("error").innerHTML =
"Open inside Telegram";


}


}






function showDashboard(){


document.getElementById("login")
.classList.add("hide");


document.getElementById("dashboard")
.classList.remove("hide");


loadData();


}







// ============================
// Load Wallet Data
// ============================


function loadData(){


let save =
localStorage.getItem("silkcoin");



if(save){


let data =
JSON.parse(save);


balance =
data.balance || 0;


}



document.getElementById("balance")
.innerHTML =
balance+" SCN";


}








// ============================
// Save Data
// ============================


function save(){


localStorage.setItem(
"silkcoin",
JSON.stringify({

balance:balance

})

);


}









// ============================
// Mining System
// ============================


function startMining(){



if(mining){


document.getElementById("mineMsg")
.innerHTML =
"⛏ Mining is running";


return;


}



mining=true;



let button =
event.target;



button.disabled=true;



let seconds=10;



let msg =
document.getElementById("mineMsg");





miningTimer =
setInterval(function(){



msg.innerHTML =
"⛏ Mining... "
+seconds+
"s";



seconds--;



if(seconds < 0){



clearInterval(miningTimer);



let reward =
Math.floor(Math.random()*20)+1;



balance += reward;



save();



document.getElementById("balance")
.innerHTML =
balance+" SCN";



msg.innerHTML =
"✅ Complete +"
+reward+
" SCN";



button.disabled=false;



mining=false;



}



},1000);



}









// ============================
// Lucky Spin
// ============================


function spin(){



let wheel =
document.getElementById("wheel");



wheel.style.transform =
"rotate("
+
(1000 + Math.random()*2000)
+
"deg)";





let rewards=[

1,
5,
10,
20,
50,
100

];




setTimeout(function(){



let reward =
rewards[
Math.floor(
Math.random()*rewards.length
)

];



balance += reward;



save();



document.getElementById("balance")
.innerHTML =
balance+" SCN";



document.getElementById("spinMsg")
.innerHTML =
"🎉 Won "
+reward+
" SCN";



},4000);



}
