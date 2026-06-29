// ===============================
// Silkcoin Network app.js
// ===============================


let balance = 0;

let miningTimer = null;


// ===============================
// LOGIN
// ===============================


function login(){


let userId =

localStorage.getItem("userID");



if(!userId){


userId =

"USER" +

Math.floor(Math.random()*1000000);



localStorage.setItem(

"userID",

userId

);


}



document.getElementById("wallet").innerHTML =

"ID: " + userId;



createWallet(userId);



showDashboard();



}






// ===============================
// SHOW APP
// ===============================


function showDashboard(){



document.getElementById("login")
.classList.add("hide");



document.getElementById("dashboard")
.classList.remove("hide");



loadData();


startTimerCheck();



}








// ===============================
// WALLET ID
// ===============================


function createWallet(id){



let wallet =

localStorage.getItem("walletID");



if(!wallet){


wallet =

"SILK" + id;



localStorage.setItem(

"walletID",

wallet

);


}



document.getElementById("myID")
.innerHTML = wallet;



}







// ===============================
// SAVE LOAD
// ===============================


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









// ===============================
// 24H MINING
// ===============================


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

"⛏ Mining Started 24H";



startTimerCheck();



}






function startTimerCheck(){



if(miningTimer)

clearInterval(miningTimer);





miningTimer = setInterval(()=>{



let active =

localStorage.getItem("mining");



if(active!="true")

return;





let start =

Number(

localStorage.getItem("startTime")

);



let time =

(24*60*60*1000)

-

(Date.now()-start);





if(time<=0){



balance += 100;



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

"✅ Mining +100 SCN";



}else{



let h =

Math.floor(time/3600000);



let m =

Math.floor((time%3600000)/60000);



let s =

Math.floor((time%60000)/1000);



document.getElementById("mineMsg")
.innerHTML =

"⛏ "

+h+"h "

+m+"m "

+s+"s";



}



},1000);



}









// ===============================
// SPIN
// ===============================


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




let rewards=[1,5,10,20,50,100];



let reward =

rewards[

Math.floor(

Math.random()*rewards.length

)

];





setTimeout(()=>{



balance += reward;



saveData();



document.getElementById("balance")
.innerHTML =

balance+" SCN";



document.getElementById("spinMsg")
.innerHTML =

"🎉 +"+reward+" SCN";



btn.disabled=false;



},4000);



}









// ===============================
// SEND COIN
// ===============================


function sendCoin(){



let amount =

Number(

document.getElementById("sendAmount").value

);



let fee = 0.0002;



if(amount<=0){


document.getElementById("sendMsg")
.innerHTML =

"Wrong amount";


return;


}



if(balance < amount+fee){


document.getElementById("sendMsg")
.innerHTML =

"Not enough balance";


return;


}



balance -=

amount+fee;



saveData();



document.getElementById("balance")
.innerHTML =

balance+" SCN";



document.getElementById("sendMsg")
.innerHTML =

"✅ Sent "+amount+

" SCN<br>Fee: "+fee;



  }
