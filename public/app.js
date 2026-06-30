const tg = window.Telegram.WebApp;


tg.ready();


tg.expand();



let userData = null;




// =====================
// LOGIN / REGISTER
// =====================


async function loginUser(){


    const user = tg.initDataUnsafe.user;



    if(!user){

        document.getElementById(
            "status"
        ).innerHTML =
        "Open from Telegram";


        return;

    }




    const response = await fetch(
        "/login",
        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },


            body:JSON.stringify({

                id:user.id,

                first_name:
                user.first_name || "",


                username:
                user.username || ""

            })

        }
    );



    userData = await response.json();




    document.getElementById(
        "status"
    ).innerHTML =
    "✅ Login Successful";



    document.getElementById(
        "username"
    ).innerHTML =
    "Welcome " +
    userData.name;



    document.getElementById(
        "balance"
    ).innerHTML =
    userData.balance;



}





// =====================
// NAVIGATION
// =====================


function go(page){

    window.location.href = page;

}



function openMining(){

    window.location.href =
    "mining.html";

}






// START

loginUser();
