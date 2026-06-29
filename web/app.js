const tg = window.Telegram.WebApp;

tg.expand();

document.getElementById("wallet").innerHTML = "Loading...";

fetch("/api/user?id=" + tg.initDataUnsafe.user.id)
.then(r=>r.json())
.then(data=>{

    document.getElementById("wallet").innerHTML=data.wallet_id;

    document.getElementById("balance").innerHTML=data.balance+" SCN";

});


function startMining(){

    fetch("/api/mine/start");

    document.getElementById("message").innerHTML="Mining Started";

}


function boost(){

    fetch("/api/ad");

    document.getElementById("message").innerHTML="1 Spin Added";

}


function spin(){

    fetch("/api/spin")
    .then(r=>r.json())
    .then(data=>{

        document.getElementById("message").innerHTML=
        "You won "+data.reward+" SCN";

    });

}


function friends(){

    alert("Coming Soon");

}
