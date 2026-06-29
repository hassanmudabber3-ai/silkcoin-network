let balance = 0;

let spinChance = 0;



function login(){


document.getElementById("login")
.style.display="none";


document.getElementById("dashboard")
.classList.remove("hide");



let wallet = localStorage.getItem("wallet");



if(!wallet){


wallet =
"SILK" + Math.floor(Math.random()*999999);


localStorage.setItem(
"wallet",
wallet
);


}



document.getElementById("wallet")
.innerHTML = wallet;



balance =

Number(

localStorage.getItem("balance") || 0

);



spinChance =

Number(

localStorage.getItem("spinChance") || 0

);



update();


}





function update(){


document.getElementById("balance")
.innerHTML =
balance+" SCN";



document.getElementById("spinMsg")
.innerHTML =

"🎡 Chances: "

+spinChance+

"/5";


}





// دیدن تبلیغ و گرفتن شانس


function watchAd(){


if(spinChance >=5){


alert("Maximum 5 spins reached");

return;


}



alert(
"📺 Watching Advertisement..."
);



setTimeout(()=>{


spinChance++;


localStorage.setItem(
"spinChance",
spinChance
);



update();



alert(
"🎉 You received 1 Spin Chance"
);



},2000);



}






function spin(){


if(spinChance<=0){


alert(
"First watch advertisement"
);


return;


}



spinChance--;



localStorage.setItem(
"spinChance",
spinChance
);





let wheel =
document.getElementById("wheel");



let rotate =

Math.floor(

Math.random()*3600

)+720;



wheel.style.transform =

"rotate("+rotate+"deg)";






setTimeout(()=>{



let rewards=[1,5,10,20,50,100];



let win =

rewards[

Math.floor(

Math.random()*rewards.length

)

];



balance += win;



localStorage.setItem(
"balance",
balance
);



document.getElementById("spinMsg")
.innerHTML =

"🎉 You won "

+win+

" SCN";



update();



},4000);



}







function startMining(){



let start =

localStorage.getItem(
"mineStart"
);



if(start){


let now = Date.now();


let passed = now - Number(start);



let hours =

passed /

(1000*60*60);



if(hours <24){


document.getElementById("mineMsg")
.innerHTML=

"⛏ Mining Active";

return;


}


}



localStorage.setItem(

"mineStart",

Date.now()

);



document.getElementById("mineMsg")
.innerHTML=

"⛏ Mining Started 24H";


}







function sendCoin(){



let receiver =

document.getElementById("receiver").value;



let amount =

Number(

document.getElementById("amount").value

);



let fee = 0.0002;



if(amount <=0){

return;

}



if(amount + fee > balance){


alert("Not enough balance");


return;


}
