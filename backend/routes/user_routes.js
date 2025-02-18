const express = require("express");
const router = express.Router();
const isAuthenciate = require("../middleware/isAuthenticate");
const { register, login, logout, upadateProfile } = require("../controllers/user_controllers");
const upload = require("../utils/upload");

router.post("/signUp",upload.fields([{
  name:"profilePhoto",maxCount:1
}]), register);
router.post("/login", login);
router.put("/profile/update", isAuthenciate,  upload.fields([
  { name: "profilePhoto", maxCount: 1 }, // Handle profile photo
  { name: "resume", maxCount: 1 }, // Handle resume
]), upadateProfile);

module.exports = router;

// const upload = require("../utils/upload"); // Import Multer setup
// const express=require('express');
// const router=express.Router();
// const isAuthenciate=require("../middleware/isAuthenticate")
// const {register,login,logout,upadateProfile}=require("../controllers/user_controllers");
// router.post("/signUp",register);
// router.post("/login",login);
// // router.post("/logout",logout);
// router.put("/profile/update",isAuthenciate,upload.single('profilePhoto'),upadateProfile);
// module.exports=router;