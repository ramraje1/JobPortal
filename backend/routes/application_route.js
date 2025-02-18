const express=require("express");
const router=express.Router();
const {updateStatus,getApplicant,getApplyedJob,applyJob,checkApply}=require("../controllers/application_controller");
const isAuthenciate=require("../middleware/isAuthenticate")
router.get("/check/:id",isAuthenciate,checkApply);
router.post("/apply/:id",isAuthenciate,applyJob);
router.get("/get",isAuthenciate,getApplyedJob);
router.get("/:id/applicant",isAuthenciate,getApplicant);
router.post("/status/:id/update",isAuthenciate,updateStatus);
module.exports=router;

