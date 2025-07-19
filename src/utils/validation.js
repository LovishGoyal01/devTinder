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

module.exports = {
  validSignUpdata,
}