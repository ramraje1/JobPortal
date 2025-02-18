import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice"
import jobSlice from "./jobslice"
import companyslice from "./companyslice"
import applicationSlice from "./applicationSlice"
const store= configureStore({
  reducer:{
auth:authSlice,
job:jobSlice,
company:companyslice,
application:applicationSlice
  }
})
export default store