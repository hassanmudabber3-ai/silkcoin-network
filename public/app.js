// Silkcoin Test Login


function login(){


console.log("LOGIN CLICKED");



document.getElementById("login").style.display="none";


document.getElementById("dashboard").style.display="block";



document.getElementById("balance").innerHTML="0 SCN";



let wallet =
localStorage.getItem("walletID");



if(!wallet){


wallet =
"SILK" + Math.floor(Math.random()*999999);



localStorage.setItem(
"walletID",
wallet
);


}



document.getElementById("wallet")
.innerHTML = wallet;



document.getElementById("myID")
.innerHTML = wallet;



}
