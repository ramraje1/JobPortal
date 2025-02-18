const User=require("../models/user_model");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
// const cloudinary=require('../utils/cloudinaryConfig')
 const register=async(req,res)=>{
    try{
   
   const {FullName,email,phoneNumber,password,role}=req.body;
   const files=req.files;
   console.log(email);
   if(!FullName ||!email ||!phoneNumber||!password||!role){
    return res.status(400).json({
      message:"something is missing",
      success:false
    })
   }
   const user=await User.findOne({email});
   if(user){
    return res.status(400).json({
      message:"User are already existing",
      success:false
    })
   }

   let hashpassword=await bcrypt.hash(password,10);
   let newUser=new User({
    FullName,email,phoneNumber,password:hashpassword,role,profile:{}
   })
   if(files.profilePhoto){
    const file=files.profilePhoto[0];
    const responce=await cloudinary.uploader.upload(file.path);
    newUser.profile.profilePhoto=responce.secure_url;

   }
   await newUser.save();
 return res.status(200).json({
  message:"data added Successfully",
  success:true
 })
    }catch(error){
      console.log(error)
    }
}
exports.register =register;
const login=async(req,res)=>{

 try{
  let {email,password,role}=req.body;
  if(!email||!password||!role){
    return res.status(400).json({
      message:"are you series",
      success:false
    })

  }
  let user=await User.findOne({email});
  if(!user){
    return res.status(400).json({
      message:"wrong Email",
      success:false
    })
  }
  let hashpassword=await bcrypt.compare(password,user.password);
  if(!hashpassword){
    return res.status(400).json({
      message:"Wrong password",
      success:false
    })
  }
  if(role!==user.role){
    return res.status(400).json({
      message:"user not avalilable in this role",
      success:false
    })
  }
  let token=await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
  res.cookie("token", token, {
    httpOnly: true,
    secure:false,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, 
  }).json({
    message:`welcome back ${user.FullName} `,
 
    user,
    success:true
  })

  

 }catch(error){
  console.log(error);
  res.status(500).json({
    message: "An internal server error occurred. Please try again later.",
    success: false,
  });
 }
}
exports.login =login;

const logout=async(req,res)=>{
  try{
return res.status(200).cookie("token","",{maxAge:0}).json({
  message:"logged out successfully",
  success:true
})
  }catch(error){
console.log(error);
return res.status(500).json({
  message: "An error occurred during logout.",
  success: false,
});
  }
}
exports.logout=logout;
// const User = require("../models/User");
const cloudinary = require("../utils/cloudinaryConfig");

const upadateProfile = async (req, res) => {
  try {
    const { FullName, phoneNumber, bio, skills } = req.body;
    const files = req.files;
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (FullName) user.FullName = FullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    if (skills) {
      const skillArray = skills.split(",").map((skill) => skill.trim());
      user.profile.skills = skillArray;
    }

    if (files.profilePhoto) {
      const profilePhoto = files.profilePhoto[0];
      const cloudResponse = await cloudinary.uploader.upload(profilePhoto.path);
      user.profile.profilePhoto = cloudResponse.secure_url;
    }
    if (files.resume) {
      const resume = files.resume[0];
      const cloudResponse = await cloudinary.uploader.upload(resume.path, {
        resource_type: "raw",
      });
      user.profile.resume = cloudResponse.secure_url;
    }
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the profile.",
      success: false,
    });
  }
};

exports.upadateProfile = upadateProfile;





// const upadateProfile=async(req,res)=>{
//   try{
//   let {FullName,phoneNumber,bio,skills}=req.body;
//   let file=req.file;
//   // if(!file){
//   //   return res.status(400).json({
//   //     message:"file not coming",
//   //     success:false
//   //   })
//   // }
//   const cloudResponse = await cloudinary.uploader.upload(file.path);
//   console.log("Cloudinary response:", cloudResponse);
//   let skillArray;
//  if(skills){
//    skillArray=skills.split(",").map((skill)=>skill.trim());
//  }
//    const userId=req.id;
//    let user=await User.findById(userId);
//    if(!user){
//     return res.status(400).json({
//       message:"user not found",
//       success:false
//     })
//    }

   
//    if(FullName)user.FullName=FullName;

//    if(phoneNumber)user.phoneNumber=phoneNumber;
//    if(bio)user.profile.bio=bio;
//    if(skills)user.profile.skills=skillArray
//    if(file)user.profile.profilePhoto=cloudResponse.secure_url;
//    await user.save();
   
// return res.status(200).json({
//   message:"upadate successfully",
//   user,
//   success:true
// })
//   }catch(error){
//     console.log(error);
//     return res.status(500).json({
//       message: "An error occurred while updating the profile.",
//       success: false,
//     });
    
//   }
// }
// exports.upadateProfile=upadateProfile;