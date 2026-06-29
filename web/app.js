// ============================
// Silkcoin Network App.js
// 24H Mining System
// ============================


let balance = 0;
let miningInterval = null;



// Telegram Login

function login(){


if(window.Telegram && Telegram.WebApp){


let user =
Telegram.WebApp.initDataUnsafe.user;


if(user){


document.getElementById("wallet").innerHTML =
"TG ID: "+user.id;


showDashboard();


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


startTimerCheck();


}







// Load data


function loadData(){


let data =
localStorage.getItem("silkcoin");


if(data){


let save =
JSON.parse(data);


balance =
save.balance || 0;


}


document.getElementById("balance")
.innerHTML =
balance+" SCN";


}







// Save


function saveData(){


localStorage.setItem(
"silkcoin",
JSON.stringify({

balance:balance,

startTime:
localStorage.getItem("startTime"),

mining:
localStorage.getItem("mining")

})

);


}







// ============================
// START 24H MINING
// ============================


function startMining(){


let active =
localStorage.getItem("mining");


if(active=="true"){


document.getElementById("mineMsg")
.innerHTML =
"⛏ Mining already running";


return;


}




let now =
Date.now();



localStorage.setItem(
"startTime",
now
);



localStorage.setItem(
"mining",
"true"
);



document.getElementById("mineMsg")
.innerHTML =
"⛏ Mining Started 24H";


startTimerCheck();


}









// ============================
// CHECK TIMER
// ============================


function startTimerCheck(){


if(miningInterval){

clearInterval(miningInterval);

}



miningInterval =
setInterval(()=>{


let mining =
localStorage.getItem("mining");


if(mining!="true"){

return;

}



let start =
Number(
localStorage.getItem("startTime")
);



let now =
Date.now();



let total =
24*60*60*1000;



let remain =
total - (now-start);





if(remain<=0){



clearInterval(miningInterval);



let reward =
100;



balance += reward;



localStorage.setItem(
"mining",
"false"
);



saveData();



document.getElementById("balance")
.innerHTML =
balance+" SCN";



document.getElementById("mineMsg")
.innerHTML =
"✅ Mining Complete +100 SCN";


}else{



let hours =
Math.floor(remain/3600000);


let minutes =
Math.floor(
(remain%3600000)/60000
);



let seconds =
Math.floor(
(remain%60000)/1000
);



document.getElementById("mineMsg")
.innerHTML =

"⛏ Mining "+
hours+"h "
+minutes+"m "
+seconds+"s";



}



},1000);


}









// ============================
// Lucky Spin
// ============================


function spin(){


let rewards=[
1,5,10,20,50,100
];


let reward =
rewards[
Math.floor(Math.random()*rewards.length)
];


balance += reward;


saveData();



document.getElementById("balance")
.innerHTML =
balance+" SCN";


document.getElementById("spinMsg")
.innerHTML =
"🎉 Won "+reward+" SCN";


}
