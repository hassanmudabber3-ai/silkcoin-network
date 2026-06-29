const tg = window.Telegram.WebApp;


tg.expand();



let user_id = 1;


if(tg.initDataUnsafe.user){

    user_id = tg.initDataUnsafe.user.id;

}





fetch("/api/user?id=" + user_id)

.then(response => response.json())

.then(data => {


    if(data.wallet){

        document.getElementById("wallet").innerHTML =
        data.wallet;


        document.getElementById("balance").innerHTML =
        data.balance + " SCN";

    }


});







function mine(){


    fetch("/api/mine")

    .then(r=>r.json())

    .then(data=>{


        document.getElementById("msg").innerHTML =
        data.message;


    });


}








function spin(){


    fetch("/api/spin")


    .then(r=>r.json())


    .then(data=>{


        document.getElementById("msg").innerHTML =

        "🎉 You won " + data.reward + " SCN";


    });


}
