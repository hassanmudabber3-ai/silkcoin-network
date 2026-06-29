let balance = 0;

let chances = 0;




function login(){


document.getElementById("login")
.style.display="none";


document.getElementById("dashboard")
.classList.remove("hide");



let wallet =
localStorage.getItem("wallet");



if(!wallet){


wallet =
"SILK" + Math.floor(Math.random()*999999);


localStorage.setItem(
"wallet",
wallet
);


}



document.getElementById("wallet")
.innerHTML=wallet;



balance =
Number(localStorage.getItem("balance") || 0);



chances =
Number(localStorage.getItem("chances") || 0);



update();


}







function update(){


document.getElementById("balance")
.innerHTML =
balance+" SCN";



document.getElementById("spinMsg")
.innerHTML =
"Chances: "+chances+"/5";


}







function watchAd(){


if(chances>=5){

alert("Maximum 5 spins");

return;

}



alert("📺 Watching Ad...");


setTimeout(()=>{


chances++;


localStorage.setItem(
"chances",
chances
);


update();


},2000);



}







function spin(){


if(chances<=0){

alert("Watch ad first");

return;

}



chances--;


let wheel =
document.getElementById("wheel");


let deg =
Math.floor(Math.random()*3000)+720;



wheel.style.transform =
"rotate("+deg+"deg)";





setTimeout(()=>{


let rewards=[1,5,10,20,50,100];


let win =
rewards[
Math.floor(Math.random()*rewards.length)
];



balance+=win;



localStorage.setItem(
"balance",
balance
);



localStorage.setItem(
"chances",
chances
);



update();


alert(
"🎉 You won "+win+" SCN"
);



},4000);



}









function startMining(){



let active =
localStorage.getItem("mining");



if(active){


document.getElementById("mineMsg")
.innerHTML=
"⛏ Mining Active";


return;

}



localStorage.setItem(
"mining",
Date.now()
);



document.getElementById("mineMsg")
.innerHTML=
"⛏ Mining Started 24H";


}








function sendCoin(){



let amount =
Number(
document.getElementById("amount").value
);



let fee=0.0002;



if(amount+fee > balance){

alert("Not enough SCN");

return;

}



balance -= amount+fee;



localStorage.setItem(
"balance",
balance
);



document.getElementById("sendMsg")
.innerHTML=
"Sent. Fee: 0.0002 SCN";


update();


}
