const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary=require("./cloudinaryConfig");
const multer = require("multer");

const storage=new CloudinaryStorage({
  cloudinary:cloudinary,
  // params:(req,file)=>{
  //   return{
  //     Folder:file.fieldname==="logo" ? "loges" :"logoFile",
  //     allowed_format:file.fieldname==="logo"? ["jpg", "png", "jpeg"] : ["pdf"],
  //     resource_
  //   }
  // }
  params:{
    folder: "profiles",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  }


})
let comupdate=multer({storage})
module.exports =comupdate;

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("./cloudinaryConfig");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "profiles",
//     allowed_formats: ["jpg", "png", "jpeg", "pdf"],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;


