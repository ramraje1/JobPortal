let mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
  FullName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phoneNumber:{
    type:Number,
    required:true,

  },
  password:{
    type:String,
    required:true,

  },
  role:{
    type:String,
    enum:['student','recuriter'],
    required:true
  },
  profile:{
  bio:{type:String},
  skills:[{type:String}],
  resume:{type:String},
  resumeOrignalName:{type:String},
  company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
  profilePhoto:{
    type:String,
    default:""
  },
  favourite:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Job"
  }]
  },
 

},{timestamps:true})
const User=mongoose.model("User",userSchema);
module.exports=User;
