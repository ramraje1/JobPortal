const { application } = require('express');
const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
   
  },
  requirements:[{
    type:String
  }],
  salary:{
    type:Number,
    required:true,

  },
  location:{
    type:String,
    required:true
  },
  jobTypes:{
    type:String,
    required:true,
   
  },
  position:{
    type:Number,
    required:true,

  },
  experiance:{
    type:Number,
    required:true,
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Company",
    required:true
  },
  created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    
  },
  applications:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Application",
  }]
},{timestamps:true})
const Job=mongoose.model("Job",jobSchema);
module.exports=Job;