const cloudinary=require("../utils/cloudinaryConfig")
let Company=require("../models/company_model");
const { default: mongoose } = require("mongoose");
const regiserCompaney=async(req,res)=>{
  try{
  const {companyName}=req.body;
  if(!companyName){
    return res.status(400).json({
      message:"companey name is required",
      success:false
    })
  }
  let company=await Company.findOne({name:companyName});
  if(company){
    return res.status(400).json({
      message:"companey are already existing",
      success:false
    })
  }
  let newCom=new Company({
    name:companyName
  })
  await newCom.save();
  return res.status(200).json({
    message:"companey are register successfully",
    newCom,
    success:true
  })
  }catch(error){
    console.log(error)
  }
}

const getCompany=async(req,res)=>{
  try{
  const userId=req.id;
  const companies=await Company.find({})
  if(!companies){
    return res.status(400).json({
      message:"companey are not existing",
      success:false
    })
  }
  return res.status(200).json({
    message: "Companies retrieved successfully",
    companies, // Send the companies data
    success: true,
  });
  }catch(error){
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while updating the profile.",
      success: false,
    });
  }
}
const delCompany=async(req,res)=>{
  try{
 let {compId}=req.body;
 console.log(compId)
   if(!mongoose.Types.ObjectId.isValid(compId)){
    return res.status(404).json({
      message:"invalid id",
      success:false
    })
   }
   let objectId=new mongoose.Types.ObjectId(compId)
   
   let delcomp=await Company.findByIdAndDelete(objectId);
   if(!delcomp){
    return res.status(404).json({
      message:"delete unsuccessful ",
      success:false
    })
   }
   return res.status(200).json({
    message:"delete successful",
    success:true
  })
  }catch(error){
    console.log(error)
  }
}
const getCompanyById=async(req,res)=>{
  try{
  const companyId=req.params.id;
  const companey=await Company.findById(companyId)
  if(!companey){
    return res.status(400).json({
      message:"companey are not existing",
      success:false
    })
  }
  return res.status(200).json({
    companey,
    success:true
  })
  }catch(error){
    console.log(error);
  }
}
// const cloudinary = require("../utils/cloudinaryConfig");
// const Company = require("../models/company_model");

// cconst cloudinary = require("../utils/cloudinaryConfig");
// const Company = require("../models/company_model");

const updateCompaney = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file; // Use `req.file` for single file upload

    let updateData = { name, description, website, location };

    // Upload logo to Cloudinary if a file is provided
    if (file) {
      const result = await cloudinary.uploader.upload(file.path);
      updateData.logo = result.secure_url; // Update the logo URL
    }

    // Debugging: Log the update data
    // console.log("Update Data:", updateData);

    // Update the company
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }

    // Debugging: Log the updated company
    

    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the company.",
      success: false,
    });
  }
};

module.exports = { regiserCompaney, getCompany, getCompanyById, updateCompaney };
// module.exports = { regiserCompaney, getCompany, getCompanyById, updateCompaney };

// const updateCompaney=async(req,res)=>{
//   try{
//   const {name,description,website,location}=req.body;
//   const file=req.file;
  
  
//   const upadateData={name,description,website,location,logo:res.secure_url};
//   if(file){
//     // let filelogo=file.logo[0];
//     let res=await cloudinary.uploader.upload(file.path);
//      upadateData.logo=res.secure_url;
//   }
//   const company=await Company.findByIdAndUpdate(req.params.id,upadateData,{new:true});

//   if(!company){
//     return res.status(400).json({
//       message:"companey are not existing",
//       success:false
//     })
//   }
//   return res.status(200).json({
//     message:"update successfully",
//     company,
//     success:true
//   })
//   }catch(error){
//     console.log(error);
//   }
// }
module.exports={regiserCompaney,getCompany,getCompanyById,updateCompaney,delCompany};