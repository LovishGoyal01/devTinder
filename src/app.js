const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup" , async (req,res) => {
 
    const user=new User(req.body);

    try{
     await user.save();
     res.send("User added successfullly");
    } catch(err){
       res.status(400).send("Error Occured")
      }
})

app.get("/user",async (req,res)=>{
    const useremail = req.body.emailId;
    try{
    const user =await User.findOne({emailId:useremail});
       if(!user){
        res.status(404).send("No user Found");
       } else{
         res.send(user);
         } 
    }
    catch(err)
     {
       res.status(400).send("Error Occured") 
     }

});

app.get("/feed",async (req,res)=>{
    try{
    const users =await User.find({});
       if(users.length === 0){
        res.status(404).send("No user Found");
       } else{
         res.send(users);
         } 
    }
    catch(err)
     {
       res.status(400).send("Error Occured") 
     }

});

app.delete("/user", async (req,res)=>{
    const userid = req.body.userId;
    try{
     await User.findByIdAndDelete(userid);
     res.send("User Deleted Successfully");
    }catch(err){
       res.status(400).send("Error Occured")
      }

})

app.patch("/user", async (req,res)=>{
    const userid = req.body.userId;
    const data = req.body;
    try{
      await User.findByIdAndUpdate({ _id : userid},data,{runValidators:true});
     res.send("User Updated Successfully");
    }catch(err){
       res.status(400).send("Error Occured")
      }

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
