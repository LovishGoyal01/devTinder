const express =require("express");

const app = express();

app.get("/",(req,res) => {
    res.send("Hello world Main");
})

app.get("/test",(req,res) => {
    res.send("Haahaa testing");
})

app.get("/user",(req,res) => {
    res.send({firstname:"Lovish",lastname:"goyal"});
})

app.post("/user",(req,res) => {
    //Server to DB
    res.send("Data submitted successfully");
})

app.listen(1505,()=>{
    console.log("Server created successfully");
})