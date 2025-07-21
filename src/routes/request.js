const express = require("express");
const requestRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth , async (req,res)=>{

    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored" , "interested"];

        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Request");
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error("User not Found!!!!")
        }


        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                { fromUserId:fromUserId , toUserId:toUserId},
                { fromUserId:toUserId , toUserId:fromUserId},
            ]
        });
        if(existingConnectionRequest){
            throw new Error("Connection Request Already Exist!!!");
        }

        const connectionRequest = new ConnectionRequest({fromUserId , toUserId , status});
        
        const data = await connectionRequest.save();

        res.json({ 
            message: `Connection Request Sent successfully`,
            data,
        })

    }catch(err){
        res.status(400).send("Error : "+ err.message); 
    }
});


module.exports = requestRouter;
