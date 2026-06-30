const tg = window.Telegram.WebApp;


tg.ready();

tg.expand();



let currentUser = null;




// =====================
// LOGIN / REGISTER
// =====================


async function loginUser(){


    const user = tg.initDataUnsafe.user;



    if(!user){


        const status =
        document.getElementById("status");


        if(status){

            status.innerHTML =
            "Open from Telegram";

        }


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




    currentUser =
    await response.json();




    localStorage.setItem(

        "silkcoin_user",

        JSON.stringify(currentUser)

    );





    showHome();

    showProfile();


}






// =====================
// HOME
// =====================


function showHome(){


    const name =
    document.getElementById(
        "username"
    );


    const balance =
    document.getElementById(
        "balance"
    );



    if(name){

        name.innerHTML =
        "Welcome " +
        currentUser.name;

    }



    if(balance){


        balance.innerHTML =
        currentUser.balance;


    }




    const status =
    document.getElementById(
        "status"
    );


    if(status){


        status.innerHTML =
        "✅ Logged in";


    }


}






// =====================
// PROFILE
// =====================


function showProfile(){


    if(!currentUser){


        let saved =
        localStorage.getItem(
            "silkcoin_user"
        );


        if(saved){

            currentUser =
            JSON.parse(saved);

        }

    }



    if(!currentUser){

        return;

    }




    let name =
    document.getElementById(
        "name"
    );



    let username =
    document.getElementById(
        "username"
    );



    let userid =
    document.getElementById(
        "userid"
    );



    let balance =
    document.getElementById(
        "balance"
    );



    let mining =
    document.getElementById(
        "mining"
    );



    let spin =
    document.getElementById(
        "spin"
    );





    if(name)

        name.innerHTML =
        "Name: "
        + currentUser.name;



    if(username)

        username.innerHTML =
        "Username: @"
        + currentUser.username;



    if(userid)

        userid.innerHTML =
        "Telegram ID: "
        + currentUser.id;




    if(balance)

        balance.innerHTML =
        currentUser.balance;




    if(mining)

        mining.innerHTML =
        "⛏ Mining: Ready";



    if(spin)

        spin.innerHTML =
        "🎡 Spin: "
        + currentUser.spin_left
        + "/5";


}







// =====================
// MENU
// =====================


function go(page){


    window.location.href =
    page;


}



function backHome(){


    window.location.href =
    "index.html";


}






// RUN

loginUser();

showProfile();
