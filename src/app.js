const express =require("express");

const app = express();

app.use("/",(req,res) => {
    res.send("Hello world Main");
})

app.use("/test",(req,res) => {
    res.send("Hello world test");
})

app.use("/hello",(req,res) => {
    res.send("Hello world Hello");
})

app.listen(1505,()=>{
    console.log("Server created successfully");
})