const mongoose = require("mongoose")
const url=process.env.MONGO_URI;
const connectionDb=async()=>{
  try{
    await mongoose.connect(url).then(()=>
    console.log('connected')).catch((error)=>{
      console.log(error);
    })
  }catch(error){
    console.log(error)
  }
}
//  export default connectionDb;
module.exports=connectionDb;