const mongoose= require("mongoose");
const Schema =mongoose.Schema

 
 const userSchema = new Schema({
     first_name:{type:String},
     last_name:{type:String},
     email:{type:String},
     password:{type:String}
 })
 
 module.exports = User= mongoose.model("users",userSchema)