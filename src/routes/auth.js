const express = require("express");
const authRouter = express.Router();

const {validSignUpdata} = require("../utils/validation");
const User = require("../models/user");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


authRouter.post("/signup" , async (req,res) => {
 
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
    
    }catch(err){
       res.status(400).send("Error : "+ err.message);
     }
});

authRouter.post("/login" , async (req,res) => {
 
    try{
      const {emailId,password} = req.body;
    
      const user = await User.findOne({emailId:emailId});
      if(!user){
         throw new Error("Invalid Credentials");
        } 

      const isPasswordValid = await user.validatePassword(password);
       if(!isPasswordValid){
          throw new Error("Invalid Credentials");
       }
  
      const token = await user.getJWT();
      res.cookie("token",token);

      res.send("Login Successful!!!");

    }catch(err){
       res.status(400).send("Error : "+ err.message);
     }
});

authRouter.post("/logout" , async (req,res) => {
    res.cookie("token" , null , { 
       expires : new Date(Date.now()),
    });
    res.send("User logged Out");
});

module.exports = authRouter;


