// =================================
// Silkcoin Network - app.js
// =================================


let balance = 0;

let miningTimer = null;



// =================================
// LOGIN
// =================================


function login(){


let userID = localStorage.getItem("userID");



if(!userID){


userID =

"USER" +

Math.floor(Math.random()*1000000);



localStorage.setItem(

"userID",

userID

);



}




let wallet =

localStorage.getItem("walletID");



if(!wallet){



wallet =

"SILK" + userID;



localStorage.setItem(

"walletID",

wallet

);



}




document.getElementById("wallet").innerHTML =

wallet;



document.getElementById("myID").innerHTML =

wallet;



document.getElementById("login")
.classList.add("hide");



document.getElementById("dashboard")
.classList.remove("hide");



loadData();



startTimerCheck();



}







// =================================
// LOAD DATA
// =================================


function loadData(){



let data =

localStorage.getItem("silkcoin");



if(data){



let save =

JSON.parse(data);



balance = save.balance || 0;



}




document.getElementById("balance")
.innerHTML =

balance + " SCN";



}







// =================================
// SAVE DATA
// =================================


function saveData(){



localStorage.setItem(

"silkcoin",

JSON.stringify({

balance: balance

})

);



}







// =================================
// MINING 24H
// =================================


function startMining(){



let mining =

localStorage.getItem("mining");



if(mining === "true"){



document.getElementById("mineMsg")
.innerHTML =

"⛏ Mining already running";



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

"⛏ Mining started";



startTimerCheck();



}






function startTimerCheck(){



if(miningTimer){

clearInterval(miningTimer);

}



miningTimer = setInterval(()=>{



let mining =

localStorage.getItem("mining");



if(mining !== "true")

return;





let start =

Number(

localStorage.getItem("startTime")

);



let remain =

86400000 -

(Date.now()-start);





if(remain <= 0){



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

"✅ Mining finished +100 SCN";



return;


}




let h =

Math.floor(remain / 3600000);



let m =

Math.floor(

(remain % 3600000)

/60000

);



let s =

Math.floor(

(remain % 60000)

/1000

);



document.getElementById("mineMsg")
.innerHTML =

"⛏ "

+h+"h "

+m+"m "

+s+"s";



},1000);



}








// =================================
// LUCKY SPIN
// =================================


function spin(){



let wheel =

document.getElementById("wheel");



let button = event.target;



button.disabled = true;



let rotate =

3600 +

Math.floor(Math.random()*360);



wheel.style.transform =

"rotate("+rotate+"deg)";





let rewards = [

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



document.getElementById("balance")
.innerHTML =

balance+" SCN";



document.getElementById("spinMsg")
.innerHTML =

"🎉 You won "

+reward+

" SCN";



button.disabled = false;



},4000);



}









// =================================
// SEND COIN
// =================================


function sendCoin(){



let amount =

Number(

document.getElementById("sendAmount").value

);



let fee = 0.0002;



if(amount <= 0){



document.getElementById("sendMsg")
.innerHTML =

"Invalid amount";



return;

}



if(balance < amount + fee){



document.getElementById("sendMsg")
.innerHTML =

"Not enough SCN";



return;


}





balance -=

(amount + fee);



saveData();



document.getElementById("balance")
.innerHTML =

balance+" SCN";



document.getElementById("sendMsg")
.innerHTML =

"✅ Sent "

+amount+

" SCN"

+

"<br>Network fee: "

+fee+

" SCN";



}







// =================================
// REFERRAL
// =================================


function loadReferral(){



let wallet =

localStorage.getItem("walletID");



if(document.getElementById("refLink")){



document.getElementById("refLink")
.innerHTML =

"https://t.me/SilkcoinBot?start="

+

wallet;



}



}






setTimeout(()=>{


loadReferral();


},1000);
