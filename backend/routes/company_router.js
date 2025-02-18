const express=require('express');
const router=express.Router();
let comupdate=require("../utils/comupload")
const isAuthenciate=require("../middleware/isAuthenticate")
const {regiserCompaney,getCompany,getCompanyById,updateCompaney,delCompany}=require("../controllers/companey_control");
router.post("/register",isAuthenciate,regiserCompaney);
router.get("/get",isAuthenciate,getCompany);
router.post("/delete",isAuthenciate,delCompany);
// router.post("/logout",logout);
router.get("/get/:id",isAuthenciate,getCompanyById);
router.put("/update/:id",isAuthenciate,comupdate.single("logo"),updateCompaney);
module.exports=router;