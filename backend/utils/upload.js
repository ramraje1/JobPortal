const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: file.fieldname === "profilePhoto" ? "profiles" : "resumes",
      allowed_formats: file.fieldname === "profilePhoto" ? ["jpg", "png", "jpeg"] : ["pdf"],
      resource_type: file.fieldname === "profilePhoto" ? "image" : "raw",
    };
  },
});

const upload = multer({ storage });

module.exports = upload;











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







// // const multer = require("multer");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // const cloudinary = require("./cloudinaryConfig");

// // // Set up Cloudinary storage
// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: {
// //     folder: "profiles", // Folder in Cloudinary
// //     allowed_formats: ["jpg", "png", "jpeg", "pdf"], // Allowed file types
// //   },
// // });

// // // Initialize Multer
// // const upload = multer({ storage });

// // module.exports = upload;
