let timer;



function loadWallet(){


fetch("/api/user")

.then(res=>res.json())

.then(data=>{


document.getElementById("balance").innerHTML =

data.balance + " SCN";



document.getElementById("wallet").innerHTML =

"Wallet ID: " + data.wallet_id;



document.getElementById("spins").innerHTML =

data.spins;



});


}






function startMining(){



fetch("/api/mine/start")

.then(res=>res.json())

.then(data=>{


alert(data.message);



let seconds = 86400;



timer=setInterval(()=>{


let h=Math.floor(seconds/3600);

let m=Math.floor((seconds%3600)/60);

let s=seconds%60;



document.getElementById("timer").innerHTML =

h+":"+m+":"+s;



seconds--;



if(seconds<0){


clearInterval(timer);


document.getElementById("timer").innerHTML=

"Mining Finished";


}



},1000);



});

}








function watchAd(){


fetch("/api/ad")


.then(res=>res.json())


.then(data=>{


alert(

"🎬 Ad Complete\n+1 Spin Chance"

);


loadWallet();


});


}






function spin(){



fetch("/api/spin")


.then(res=>res.json())


.then(data=>{


alert(

"🎡 You won "

+data.reward+

" SCN"

);


loadWallet();


});


}






function sendCoin(){



let receiver =

document.getElementById("receiver").value;



let amount =

document.getElementById("amount").value;



fetch("/api/send",{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


receiver:receiver,


amount:amount


})


})


.then(res=>res.json())


.then(data=>{


alert(data.message);


});



}






loadWallet();