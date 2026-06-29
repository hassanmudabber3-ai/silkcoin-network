const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json());


// load public folder

app.use(express.static(__dirname + "/public"));



// test

app.get("/", (req,res)=>{

res.sendFile(
__dirname + "/public/index.html"
);

});





const PORT = process.env.PORT || 3000;



app.listen(PORT,()=>{


console.log(
"Silkcoin Server Running on " + PORT
);


});
