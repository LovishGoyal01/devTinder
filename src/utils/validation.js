const validator=require("validator");

const  validSignUpdata= (req) =>{

  const {firstName,lastName,emailId,password} = req.body;

    if(! firstName || !lastName || !emailId || !password){
         throw new Error("Something Is Missing");
      }
    if(!validator.isEmail(emailId)){
      throw new Error("Not valid email");
      }
    if(!validator.isStrongPassword(password)){
        throw new Error("Not strong password");
     }       
}

const validateEditProfileData = (req) =>{

  const allowedEdits = ["firstName" , "lastName" , "age" , "gender" , "photoURL" , "about" , "skills"] 

  const isEditAllowed = Object.keys(req.body).every(feild => allowedEdits.includes(feild)); 
  
   return isEditAllowed;
}

module.exports = {
  validSignUpdata,
  validateEditProfileData,
}