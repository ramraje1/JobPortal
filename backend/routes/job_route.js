const express=require('express');
const router=express.Router();
const isAuthenciate=require("../middleware/isAuthenticate")
const {postJob,getAllJob,getjobById,adminJob,getFavouritepost,getFav,deleteFev,updateJob,deleteJob}=require("../controllers/job_controller");
router.post("/post",isAuthenciate,postJob);
router.post("/update/:id",isAuthenciate,updateJob);
router.get("/get",isAuthenciate,getAllJob);
router.post("/delete",isAuthenciate,deleteJob);
router.post("/getfav",isAuthenciate,getFavouritepost);
router.get("/getreq",isAuthenciate,getFav);
router.post("/delfav",isAuthenciate,deleteFev)
// router.post("/logout",logout);
router.get("/get/:id",isAuthenciate,getjobById);
router.get("/adiminjob",isAuthenciate,adminJob);
module.exports=router;