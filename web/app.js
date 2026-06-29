const tg = window.Telegram.WebApp;


tg.expand();



let user_id = 1;



if(tg.initDataUnsafe.user){

    user_id =
    tg.initDataUnsafe.user.id;

}







function show(page){


    document.querySelectorAll(".page")
    .forEach(p=>{

        p.classList.add("hidden");

    });



    document.getElementById(page)
    .classList.remove("hidden");


}








fetch("/api/user?id="+user_id)


.then(r=>r.json())


.then(data=>{


    if(data.wallet){


        document.getElementById("address")
        .innerHTML =
        "🆔 "+data.wallet;



        document.getElementById("balance")
        .innerHTML =
        data.balance+" SCN";


    }


});









function startMining(){



    fetch("/api/mine?id="+user_id)



    .then(r=>r.json())


    .then(data=>{


        document.getElementById("mineMsg")
        .innerHTML =
        "⛏ "+data.message;


    });



}









function spin(){


    fetch("/api/spin?id="+user_id)


    .then(r=>r.json())


    .then(data=>{


        document.getElementById("spinMsg")
        .innerHTML =

        "🎉 You won "
        +data.reward+
        " SCN";


    });



}
