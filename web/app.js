// =========================
// Silkcoin Network App.js
// =========================


let balance = 0;

let miningTimer = null;





// =========================
// Telegram Login
// =========================


function login(){


if(window.Telegram && Telegram.WebApp){


let user =
Telegram.WebApp.initDataUnsafe.user;



if(user){



document.getElementById("wallet").innerHTML =

"Telegram ID: "
+
user.id;



createWallet(user.id);



showDashboard();



}else{


document.getElementById("error").innerHTML =

"Telegram User Not Found";


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










// =========================
// Wallet
// =========================



function createWallet(id){



let wallet =

localStorage.getItem("walletID");



if(!wallet){


wallet =

"SILK"

+

id;



localStorage.setItem(

"walletID",

wallet

);


}



document.getElementById("myID")
.innerHTML = wallet;



}










// =========================
// Save / Load
// =========================


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






function saveData(){



localStorage.setItem(

"silkcoin",

JSON.stringify({

balance:balance

})

);



}









// =========================
// 24H MINING
// =========================



function startMining(){



let active =

localStorage.getItem("mining");



if(active=="true"){



document.getElementById("mineMsg")
.innerHTML =

"⛏ Mining Active";


return;


}




localStorage.setItem(

"mining",

"true"

);



localStorage.setItem(

"startTime",

Date.now()

);



document.getElementById("mineMsg")
.innerHTML =

"⛏ Mining Started";



startTimerCheck();



}









function startTimerCheck(){



if(miningTimer){

clearInterval(miningTimer);

}




miningTimer =

setInterval(()=>{



let active =

localStorage.getItem("mining");



if(active!="true")

return;




let start =

Number(

localStorage.getItem("startTime")

);



let remain =

(24*60*60*1000)

-

(Date.now()-start);





if(remain<=0){



balance +=100;



saveData();



localStorage.setItem(

"mining",

"false"

);



document.getElementById("balance")
.innerHTML =

balance+" SCN";



document.getElementById("mineMsg")
.innerHTML =

"✅ Mining Complete +100 SCN";



}else{



let h =

Math.floor(remain/3600000);



let m =

Math.floor((remain%3600000)/60000);



let s =

Math.floor((remain%60000)/1000);




document.getElementById("mineMsg")
.innerHTML =

"⛏ "

+h+"h "

+m+"m "

+s+"s";



}




},1000);



}










// =========================
// Lucky Spin
// =========================



function spin(){



let wheel =

document.getElementById("wheel");



let btn = event.target;



btn.disabled=true;




let rotate =

3600 +

Math.floor(Math.random()*360);



wheel.style.transform =

"rotate("+rotate+"deg)";




let rewards=[

1,

5,

10,

20,

50,

100

];



let reward =

rewards[

Math.floor(

Math.random()*rewards.length

)

];






setTimeout(()=>{



balance += reward;



saveData();



documentگ
