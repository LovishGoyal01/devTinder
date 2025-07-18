const mongoose=require("mongoose");

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://LovishGoyal:TmaA8QvLh7POFy5o@namastenode.gzhexya.mongodb.net/devTinder");
}

module.exports =connectDB;

