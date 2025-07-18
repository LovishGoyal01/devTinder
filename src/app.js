const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup" , async (req,res) => {
 
    const userObj = {
         firstName:"Lovish",
         lastName:"Goyal",
         emailId:"goyallovish852@gmail.com",
         password:"Lovish@123",
         age:20,
         gender:"Male",
    }

    const user=new User(userObj);

   await user.save();
      res.send("User added successfullly")
})

connectDB()
 .then(()=>{
    console.log("Connected to DB successfully");
    app.listen(1505,()=>{
    console.log("Server created successfully");
    })
 })
 .catch(()=>{
     console.error("Error Occured");
 });
