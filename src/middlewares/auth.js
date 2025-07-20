const jwt =require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req,res,next) =>{
 try{
   const {token} = req.cookies;
   if(!token){
    throw new Error("Token is not valid!!!");
   }

   const decodedObg = await jwt.verify(token,"DEV@Tinder$1505");
   
   const {_id} = decodedObg;

   const user = await User.findById(_id);

   if(!user){
    throw new Error("User not found!!!");
   }
   req.user = user;
   next();
 }catch(err){
   res.status(400).send("ERROR : "+err.message)
  }
}
module.exports = {
    userAuth,
}
