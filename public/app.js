function login(){


alert("LOGIN WORKED");



document.getElementById("login").style.display="none";


document.getElementById("dashboard").style.display="block";



document.getElementById("wallet").innerHTML =

"SILK" + Math.floor(Math.random()*999999);



}
