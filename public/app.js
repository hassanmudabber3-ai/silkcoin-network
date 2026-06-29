let balance =
Number(localStorage.getItem("balance") || 0);



function startMining(){


let start =
localStorage.getItem("mineStart");



if(start){

document.getElementById("msg").innerHTML =
"Mining already active";

return;

}



localStorage.setItem(
"mineStart",
Date.now()
);


timer();


}



function timer(){


let x =
setInterval(()=>{


let start =
Number(localStorage.getItem("mineStart"));



let diff =
86400000 - (Date.now()-start);



if(diff<=0){


clearInterval(x);

document.getElementById("timer")
.innerHTML="Finished";


return;

}



let h =
Math.floor(diff/3600000);


let m =
Math.floor(diff%3600000/60000);


let s =
Math.floor(diff%60000/1000);



document.getElementById("timer")
.innerHTML=

h+":"+m+":"+s;



},1000);


}






function spin(){


let rewards=[1,5,10,20,50,100];


let win =
rewards[Math.floor(Math.random()*6)];



balance+=win;


localStorage.setItem(
"balance",
balance
);



document.getElementById("result")
.innerHTML=
"🎉 You won "+win+" SCN";


}






function send(){


let amount =
Number(
document.getElementById("amount").value
);



let fee=0.0002;



if(amount+fee > balance){

alert("Not enough");

return;

}



balance -= amount+fee;



localStorage.setItem(
"balance",
balance
);



document.getElementById("msg")
.innerHTML=
"Sent with fee 0.0002";


}



window.onload=()=>{


let b=document.getElementById("balance");


if(b){

b.innerHTML=balance+" SCN";

}


}
