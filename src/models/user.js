const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,    
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("Not valid email");
           }
        },
    },
    password:{
        type:String,
        required:true,  
    },
    age:{
        type:Number,
        min:18,
        max:70,
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                 throw new Error("Gender data is not valid");
            }
        }
    },
    photoURL:{
        type:String,
        default:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg",
        validate(value){
           if(!validator.isURL(value)){
            throw new Error("Not valid photoURL");
           }
        }   
    },
    about:{
       type:String,
       default:"This is default about of user",
    },
    skills:{
        type: [String],
        validate(value){
            if(value.length>5)
                 {
                    throw new Error("Skills can't be more than 5")
                 }
        }
    }
},
{
  timestamps:true
})

const User = mongoose.model("User",userSchema);

module.exports = User;