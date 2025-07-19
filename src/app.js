const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bycrypt = require("bcrypt");
const {validSignUpdata} = require("./utils/validation");

const app = express();

app.use(express.json());

app.post("/signup" , async (req,res) => {
 
   try{
      validSignUpdata(req);
   const {firstName,lastName,emailId,password} = req.body;

    const passwordHash = await bycrypt.hash(password,10);

    const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    });

    
     await user.save();
     res.send("User added successfullly");
    } catch(err){
       res.status(400).send("Error : "+ err.message);
      }
})

app.post("/login" , async (req,res) => {
 
   try{
      const {emailId,password} = req.body;
    
      const user = await User.findOne({emailId:emailId});

      if(!user){
            res.send("Invalid Credentials");
        } 

      const isPasswordValid = await bycrypt.compare(password , user.password)  

       if(!isPasswordValid){
          res.send("Invalid Credentials");
       }

      res.send("Thanks For Login"); 

    } catch(err){
       res.status(400).send("Error : "+ err.message);
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
       res.status(400).send("Error : "+ err.message); 
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
       res.status(400).send("Error : "+ err.message);
     }

});

app.delete("/user", async (req,res)=>{
    const userid = req.body.userId;
    try{
     await User.findByIdAndDelete(userid);
     res.send("User Deleted Successfully");
    }catch(err){
       res.status(400).send("Error : "+ err.message);
      }

})

app.patch("/user/:userID", async (req,res)=>{
    const userid = req.params?.userID;
    const data = req.body;

    const allowedUpdates = ["age","gender","photoURL","about","skills"];

    try{
      const isUpdateAllowed = Object.keys(data).every((k) =>  allowedUpdates.includes(k))
      if(!isUpdateAllowed){
        res.send("Update Not Allowed");
      }
     await User.findByIdAndUpdate({ _id : userid},data,{runValidators:true});
     res.send("User Updated Successfully");
    }catch(err){
       res.status(400).send("Error : "+ err.message);
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
     res.status(400).send("Error : "+ err.message);
 });
