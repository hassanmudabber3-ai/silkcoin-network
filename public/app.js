let balance=0;



function login(){


document.getElementById("login")
.style.display="none";


document.getElementById("dashboard")
.style.display="block";



let wallet=

localStorage.getItem("wallet");



if(!wallet){


wallet="SILK"+Math.floor(Math.random()*999999);


localStorage.setItem(
"wallet",
wallet
);

}



document.getElementById("wallet")
.innerHTML=wallet;



load();


}





function load(){


balance=

Number(

localStorage.getItem("balance") || 0

);



document.getElementById("balance")
.innerHTML=

balance+" SCN";


}





function save(){


localStorage.setItem(
"balance",
balance
);


}






function startMining(){


let start=

localStorage.getItem("mineStart");



if(start){


document.getElementById("mineMsg")
.innerHTML="⛏ Mining Active";

return;


}



localStorage.setItem(

"mineStart",

Date.now()

);



document.getElementById("mineMsg")
.innerHTML=

"⛏ Mining Started 24H";

}





function spin(){



let r=[1,5,10,20,50,100];


let win=

r[Math.floor(Math.random()*r.length)];



balance+=win;


save();



document.getElementById("balance")
.innerHTML=

balance+" SCN";



document.getElementById("spinMsg")
.innerHTML=

"🎉 +"+win+" SCN";


}
