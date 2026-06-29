let balance = Number(localStorage.getItem("balance") || 0);

let miningReward = 10;



function save(){

localStorage.setItem(
"balance",
balance
);

}





// =====================
// MINING 24H
// =====================


function startMining(){


let start = localStorage.getItem("mineStart");


if(start){


document.getElementById("mineMsg").innerHTML =
"⛏ Mining is already running";


return;


}



localStorage.setItem(
"mineStart",
Date.now()
);



document.getElementById("mineMsg").innerHTML =
"⛏ Mining Started";


updateMining();



}






function updateMining(){



let timer = document.getElementById("timer");


if(!timer) return;



setInterval(()=>{


let start =

Number(localStorage.getItem("mineStart"));


if(!start){

return;

}



let total = 24*60*60*1000;


let remain =

total - (Date.now()-start);





if(remain <=0){



timer.innerHTML="Finished";



if(!localStorage.getItem("rewardAdded")){


balance += miningReward;


save();



localStorage.setItem(
"rewardAdded",
"yes"
);



}


document.getElementById("earned").innerHTML =

"Earned: "+miningReward+" SCN";



return;


}





let h = Math.floor(remain/3600000);


let m = Math.floor(
(remain%3600000)/60000
);


let s = Math.floor(
(remain%60000)/1000
);



timer.innerHTML =

h+":"+m+":"+s;



},1000);



}






// =====================
// LUCKY SPIN
// =====================



function spin(){



let wheel = document.getElementById("wheel");


if(wheel){


let deg =

Math.floor(Math.random()*5000)+3000;



wheel.style.transform =

"rotate("+deg+"deg)";


}




setTimeout(()=>{


let rewards=[1,2,3,4,5,6,7,8,9,10];


let win =

rewards[Math.floor(Math.random()*10)];



balance += win;


save();



let result =

document.getElementById("result");



if(result){


result.innerHTML =

"🎉 YOU WON "+win+" SCN";


}



confetti();



},5000);



}







function confetti(){



for(let i=0;i<80;i++){



let c=document.createElement("div");


c.className="confetti";


c.style.left =
Math.random()*100+"vw";



c.style.background =

"hsl("+Math.random()*360+",100%,50%)";



document.body.appendChild(c);



setTimeout(()=>{

c.remove();

},3000);



}


}







// =====================
// LOAD
// =====================


window.onload=function(){


updateMining();



let b=document.getElementById("balance");


if(b){


b.innerHTML =
balance+" SCN";


}


}
