let balance = Number(localStorage.getItem("balance") || 0);

let miningReward = 10;





function save(){

localStorage.setItem(
"balance",
balance
);

}





function showBalance(){

let b=document.getElementById("balance");

if(b){

b.innerHTML=balance+" SCN";

}

}






// =================
// MINING
// =================


function startMining(){


let start =
localStorage.getItem("mineStart");


if(!start){


localStorage.setItem(
"mineStart",
Date.now()
);


localStorage.removeItem(
"rewardAdded"
);


}


document.getElementById("mineMsg")
.innerHTML =
"⛏ Mining Started";


}




function miningTimer(){


let timer =
document.getElementById("timer");


if(!timer)return;



setInterval(()=>{


let start =
Number(localStorage.getItem("mineStart"));



if(!start){

return;

}



let remain =
86400000-(Date.now()-start);



if(remain<=0){



timer.innerHTML="Finished";


if(
!localStorage.getItem("rewardAdded")
){


balance+=miningReward;


save();


localStorage.setItem(
"rewardAdded",
"yes"
);



}



document.getElementById("earned")
.innerHTML=

"Earned "+miningReward+" SCN";



return;


}





let h =
Math.floor(remain/3600000);



let m =
Math.floor(remain%3600000/60000);



let s =
Math.floor(remain%60000/1000);



timer.innerHTML=

h+":"+m+":"+s;



},1000);



}







// =================
// SPIN
// =================


function spin(){



let wheel =
document.getElementById("wheel");


let deg =
Math.floor(Math.random()*3600)+720;



if(wheel){

wheel.style.transform=
"rotate("+deg+"deg)";

}




setTimeout(()=>{


let rewards=[
1,2,3,4,5,
6,7,8,9,10
];



let win =
rewards[
Math.floor(Math.random()*10)
];



balance+=win;


save();



document.getElementById("result")
.innerHTML=

"🎉 +"+win+" SCN";



},4000);



}







// =================
// WALLET
// =================


function sendCoin(){



let amount=

Number(
document.getElementById("amount").value
);



let receiver=

document.getElementById("receiver").value;



let fee=0.0002;



if(amount<=0){

return;

}




if(amount+fee > balance){


alert("Not enough balance");


return;

}



balance -= amount+fee;


save();



document.getElementById("sendMsg")
.innerHTML=

"Sent to "+receiver+

"<br>Fee: 0.0002 SCN";



showBalance();



}







window.onload=function(){


showBalance();

miningTimer();


}
