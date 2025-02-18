
require('dotenv').config();
// let url="mongodb+srv://ramchandramane9960:R8805@cluster0.xojmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let mongoose=require('mongoose');
let express=require('express');
let app=express();
let port=process.env.PORT||8080;
 let router=require("./routes/user_routes");
 let companeyRouter=require("./routes/company_router");
 let jobRouter=require("./routes/job_route");

let applicationRouter=require("./routes/application_route")
let cookieParser=require('cookie-parser');
let cors=require('cors');
const  connectionDb  = require('./utils/db');
app.use(cookieParser());
app.use(cors(
  {
    origin:"http://localhost:5173",
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
   
  }
));
app.use(express.json());


app.use(express.urlencoded({extended:true}));
// mongoose.connect(url).then((connection)=>{
//   console.log("connected")
// }).catch((error)=>{
//   console.log(error)
// })
app.use("/api/user",router);
app.use("/api/company",companeyRouter);
app.use("/api/job",jobRouter);
app.use("/api/application",applicationRouter)

app.listen(port,()=>{
  connectionDb();
  console.log(`app listen on http://localhost:${port}` );
})