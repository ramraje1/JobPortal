const jwt=require("jsonwebtoken");
const isAuthenciate=async(req,res,next)=>{
  try{
    // console.log("Cookies:", req.cookies);
const token=req.cookies.token;
if(!token){
  return res.status(401).json({
    message:"user not is authenciated",
    success:false
  })
}
const decode=await jwt.verify(token,process.env.SECRET_KEY);
if(!decode){
  return res.status(401).json({
    message:"invalid token",
    success:false
  })
}
req.id=decode.userId;
// console.log("Token received:", req.cookies.token);
// console.log("Decoded userId:", req.id);

next();
  }catch(error){
    console.log(error);
    res.status(500).json({
      message: "An error occurred during authentication",
      success: false,
    });
    
  }
}
module.exports=isAuthenciate;