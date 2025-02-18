const Job = require("../models/job_model");
const User = require("../models/user_model");
const Company=require("../models/company_model");
const mongoose = require("mongoose");
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobTypes,
      position,
      experiance,
      company_id,
     
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobTypes ||
      !position ||
      !experiance ||
      !company_id
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const userId=req.id;
    let newJob = new Job({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobTypes,
      position,
      experiance,
      company: company_id,
      created_by:userId
      
    });
    await newJob.save();
    return res.status(200).json({
      message: "Job added successfully",
      newJob,
      success: true,
    });
  } catch (error) {
    console.log("errpr",error);
    return res.status(500).json({
      message:"Internal server error",
      
    })
  }
};
const getAllJob=async(req,res)=>{
  try{
    const keyword=req.query.keyword||"";
    const query={
      $or:[{
      title:{$regex:keyword,$options:`i`}
      },{description:{$regex:keyword,$options:`i`}}]
    }
let jobs=await Job.find(query).populate({path:"company"}).sort({createdAt:-1});
if(!jobs){
  return res.status(400).json({
    message: "Job not found",
    
    success: false,
  });
}
return res.status(200).json({
  message: "Job added successfully",
  jobs,
  success: true,
});
  }catch(error){
    console.log(error);
    return res.status(500).json({
      message:"Internal server error",
      
    })
  }
}
const updateJob=async(req,res)=>{
  try{
    let jobId=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(jobId)){
   return res.status(400).json({
    message:"isInvalid json id"
   })
    }
    let Objectid=new mongoose.Types.ObjectId(jobId);
   
let { title,
  description,
  requirements,
  salary,
  location,
  jobTypes,
  position,
  experiance}=req.body;
  const updateData={ title,
    description,
    requirements,
    salary,
    location,
    jobTypes,
    position,
    experiance}
    let updatedData=await Job.findByIdAndUpdate(Objectid,updateData,{new:true});
    if(!updatedData){
      return res.status(404).json({
        message:"update is not done properly",
        success:false,
        
      })
    }
  
      return res.status(200).json({
        message:"update  done properly",
        success:true,
        
      })
  
    
  }catch(error){
 console.log(error);
  }
}
const getjobById=async(req,res)=>{
  try{
 let jobid=req.params.id;
 let findjob=await Job.findById(jobid).populate({path:"company"}).sort({createdAt:-1});
 if(!findjob){
  return res.status(404).json({
    message: "Job not found",
   
    success: false,
  });
 }
 return res.status(200).json({
  message: "Job find successfully",
  findjob,
  success: true,
});
  }catch(error){
    console.log(error);
  }
}

const getFavouritepost=async(req,res)=>{
  try{
  let {favId}=req.body;
  let userId=req.id;

  if(!favId){
    return res.status(400).json({
      message:"Job id  not got",
      success:false
    })
  }
  let user=await User.findById(userId);
  if(user.profile?.favourite?.includes(favId)){
    return res.status(404).json({
      message:"Job already in favourite",
      success:false
    })
  }
  let updateUser=await User.findByIdAndUpdate(userId,
   {$addToSet: {"profile.favourite":favId
  }},{ new: true }
  ).populate("profile.favourite")
  if(!updateUser){
    return res.status(400).json({
      message:"user not got",
      success:false
    })
  }
  return res.status(200).json({
    message: "favourite Job find successfully",
    favjob: updateUser.profile.favourite,
    success: true,
  });
  }catch(error){
    console.log(error);
  }
}
const getFav=async(req,res)=>{
  try{
  let userId=req.id;
  let user=await User.findById(userId).populate({path:"profile.favourite",
    populate:{
      path:"company"
    }
  })
  if(!user){
    return res.status(400).json({
      message:"user not got",
      success:false
  })
}
let favjobs=user.profile.favourite;
return res.status(200).json({
  message:"find successfully",
  favjobs,
  success:true
})
  }catch(error){
    console.log(error)
  }
}
// let deleteFev=async(req,res)=>{
//   try{
//   let {jobId}=req.body;
//   let userId=req.id
//   let delId=await User.findByIdAndUpdate(userId,{$pull:{"profile.favourite":jobId}},{new:true});
//   if(!delId){
//     return res.status(404).json({
//       message:"job not found to delete",
//       success:false
//     })
//   }
//   return res.status(200).json({
//     message:"delete successfully",
//     success:true,
    
//   })
//   }catch(error){
//     console.log(error)
//     return res.status(404).json({
//       message:"internal server error",
//       success:false
//     })
//   }
// }
const deleteJob=async(req,res)=>{
  try{
    let {JobId}=req.body;
    let userId=req.id;
    if(!mongoose.Types.ObjectId.isValid(JobId)){
      return res.status(400).json({
        message: "Invalid job ID",
        success: false,
      });
    }
    let delJob=await Job.findByIdAndDelete(JobId);
    
if(!delJob){
  return res.status(400).json({
    message: "not delete successful",
    success: false,
  });
}
return res.status(200).json({
  message: "Delete successful",
  success: true,
});
  }catch(error){
    console.log(error);
  }
}

const deleteFev = async (req, res) => {
  try {
    const { jobId } = req.body; // Extract jobId from the request body
    const userId = req.id; // Extract userId from the request (e.g., from authentication middleware)

    // Validate jobId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: "Invalid job ID",
        success: false,
      });
    }

    // Remove the job from the user's favorites
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { "profile.favourite": jobId } }, // Remove the jobId from the favourites array
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job removed from favorites successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error removing job from favorites:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


// let deleteUser = async (req, res) => {
  // try {
  //   let { delId } = req.body;
  //   let userId = req.id;

  //   // ✅ Validate delId is a valid ObjectId
  //   if (!mongoose.Types.ObjectId.isValid(delId)) {
  //     return res.status(400).json({
  //       message: "Invalid ID format",
  //       success: false,
  //     });
  //   }

  //   // ✅ Convert delId to ObjectId 
  //   let objectId = new mongoose.Types.ObjectId(delId);

  //   // ✅ Correctly remove item from the profile.favourite array
  //   let user = await User.findByIdAndUpdate(
  //     userId,
  //     { $pull: { "profile.favourite": objectId } },
  //     { new: true }
  //   );

  //   if (!user) {
  //     return res.status(400).json({
  //       message: "User not found",
  //       success: false,
  //     });
  //   }

  //   return res.status(200).json({
  //     message: "Deleted successfully",
  //     success: true,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({
  //     message: "Internal server error",
  //     success: false,
  //   });
  // }
// };

// let deleteUser=async(req,res)=>{
//   try{
// let {delId}=req.body;
// let userId=req.id;
//  let user=await User.findByIdAndUpdate(userId,{$pull:{"profile.favourite":delId}},{new:true});
// if(!user){
//   return res.status(400).json({
//     message:"user not got",
//     success:false
//   })
// }
// return res.status(200).json({
//   message:"delete successfully",

//   success:true
// })
//   }catch(error){
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//   })

// }
// }
const adminJob=async (req,res)=>{
  try{  
    const adminId=req.id;
   
    const getJob=await Job.find({created_by:adminId}).populate({path:"company"}).sort({createdAt:-1});
    if(!getJob){
      return res.status(404).json({
        message: "Job not found",
       
        success: false,
      });
     }
     return res.status(200).json({
      message: "Job find successfully",
      getJob,
      success: true,
    });

  }catch(error){
    console.log(error)
  }
}
module.exports={postJob,getAllJob,getjobById,adminJob,getFavouritepost,getFav,deleteFev,updateJob,deleteJob}