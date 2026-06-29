let balance =

Number(

localStorage.getItem("balance") || 0

);





function save(){


localStorage.setItem(

"balance",

balance

);


}






function spin(){



let wheel =

document.getElementById("wheel");



let result =

document.getElementById("result");





let rotate =

Math.floor(Math.random()*5000)+3000;



wheel.style.transform =

"rotate("+rotate+"deg)";





setTimeout(()=>{



let rewards=[

1,2,3,4,5,

6,7,8,9,10

];



let win =

rewards[

Math.floor(Math.random()*10)

];




balance += win;



save();




result.innerHTML =

"🎉 YOU WON "+win+" SCN";



confetti();



},5000);




}







function confetti(){



for(let i=0;i<100;i++){



let c=document.createElement("div");



c.className="confetti";



c.style.left =

Math.random()*100+"vw";



c.style.background =

"rgb("+

Math.random()*255+

","+

Math.random()*255+

","+

Math.random()*255+

")";




document.body.appendChild(c);




setTimeout(()=>{


c.remove();


},3000);



}



}
