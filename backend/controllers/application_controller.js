const Application=require('../models/application_model');
const Job = require('../models/job_model');
const mongoose = require("mongoose");
const { options } = require('../routes/job_route');


const checkApply=async(req,res)=>{
  try{
   const jobid=req.params.id;
   const userId=req.id;
   const existingUser=await Application.findOne({
    job:jobid,
    applicant:userId
   })
   if(existingUser){
    return res.status(200).json({
      success:true,
      status:existingUser.status,
      applied:true
    })
   }else{
    return res.status(200).json({
      success:true,
      
      applied:false
    })
   }
  }catch(error){
console.log(error);
return res.status(200).json({
  success:false,
  message: "An error occurred while checking the application status.",

})
  }
}






const applyJob=async(req,res)=>{
  try{
  const userId=req.id;
  const jobId=req.params.id;
  if(!jobId){
    return res.status(400).json({
      message:"job id is not get",
      success:false
    })
  }
  const existingJob=await Application.findOne({job:jobId,applicant:userId});
  if(existingJob){
    return res.status(400).json({
      message:"you are already applied",
      success:false
    })
  }
  const job=await Job.findById(jobId);
  if(!job){
    return res.status(400).json({
      message:"job not found",
      success:false
    })
  }
  const newapplication=await Application.create({
    job:jobId,
    applicant:userId
  })

  job.applications.push(newapplication._id);
  await job.save();
  return res.status(200).json({
    message:"job applied successfully",
    success:true
  })
  }catch(error){
    console.log(error)
  }
}
const getApplyedJob=async(req,res)=>{
  try{
  const userId=req.id;
  const application =await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
    path:'job',
    options:{sort:{createdAt:-1}},
    populate:{
      path:"company",
      options:{
        sort:{createdAt:-1}
      }
    }
  });
  if(!application){
    return res.status(404).json({
      message:"application not found",
      success:false
    })
  }
  return res.status(200).json({
    application,
    success:true
  })
  }catch(error){

  }
  
}
const getApplicant=async(req,res)=>{
  try{
  const jobId=req.params.id;
  const job=await Job.findById(jobId).populate({path:"applications",options:{sort:{createdAt:-1}},populate:{path:"applicant"}});
  if(!job){
    return res.status(400).json({
      message:"job not found",
      success:false
    })
  }
  return res.status(200).json({
    job,
    success:true
  })
  }catch(error){
    console.log(error)
  }
}
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body; // Extract status from the request body
    const applicationId = req.params.id;

    // Validate status
    if (!status || typeof status !== "string") {
      return res.status(400).json({
        message: "Valid status is required",
        success: false,
      });
    }

    // Validate applicationId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        message: "Invalid application ID",
        success: false,
      });
    }

    // Find the application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    // Update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An internal server error occurred",
      success: false,
    });
  }
};
module.exports={updateStatus,getApplicant,getApplyedJob,applyJob,checkApply};