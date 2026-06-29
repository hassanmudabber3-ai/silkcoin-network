const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();


app.use(cors());

app.use(express.json());


// مهم: اتصال پوشه public

app.use(express.static(path.join(__dirname, "public")));



app.get("/", (req,res)=>{

res.sendFile(

path.join(__dirname,"public","index.html")

);

});



const PORT = process.env.PORT || 3000;



app.listen(PORT,()=>{

console.log(
"Silkcoin Server Running on " + PORT
);

});
