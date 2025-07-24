const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoURL age gender about skills";

userRouter.get("/user/requests/received" , userAuth , async (req,res)=>{
    try{
     const loggedInUser = req.user;
      
     const connectionRequest = await ConnectionRequest.find({
        toUserId : loggedInUser._id,
        status : "interested",
     }).populate("fromUserId" , USER_SAFE_DATA );

     res.send(connectionRequest);
    } catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

userRouter.get("/user/connections" , userAuth , async (req,res)=>{
    try{
     const loggedInUser = req.user;
      
     const connectionRequest = await ConnectionRequest.find({
      $or:[
        {toUserId :loggedInUser._id , status : "accepted"},
        {fromUserId:loggedInUser._id , status : "accepted"},
      ]
    })
      .populate("fromUserId" ,USER_SAFE_DATA)
      .populate("toUserId" ,USER_SAFE_DATA);

    const data = connectionRequest.map((row)=> {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
     }) 
        res.json({data});
    
    } catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

userRouter.get("/feed" , userAuth , async (req,res)=>{
  
    try{
     
      const loggedInUser = req.user;

      const page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      limit = limit > 50 ? 50: limit;

      const skip = (page - 1)*limit;

      
      const connectionRequest = await ConnectionRequest.find({
       $or: [{toUserId:loggedInUser._id},{fromUserId:loggedInUser._id}]
      }).populate("fromUserId toUserId");

      const hideUserFromFeed = new Set();

      connectionRequest.forEach((req) =>{
        hideUserFromFeed.add(req.fromUserId._id.toString());
        hideUserFromFeed.add(req.toUserId._id.toString());
      })

      const users = await User.find({
       $and : [
        { _id : {$nin : Array.from(hideUserFromFeed)}},
        { _id : {$ne : loggedInUser._id.toString()}}
       ]
      }).select(USER_SAFE_DATA).skip(skip).limit(limit);
      
      res.send(users);

    }catch(err){
        res.status(400).send("ERROR : "+err.message);
    }

});

module.exports = userRouter;