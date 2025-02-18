const mongoose=require('mongoose');
const companySchemay=new mongoose.Schema({
 name:{
    type:String,
    required:true
  },
  description:{
    type:String,
   
   
  },
  website:{
    type:String,
   
  },
  location:{
    type:String,
    
   
  },
  logo:{
    type:String
    // type:mongoose.Schema.ObjectId,
    // ref:"User",
    
  }

},{timestamps:true})
const Company=mongoose.model("Company",companySchemay);
module.exports=Company;