
import { createSlice } from "@reduxjs/toolkit";


let applicationSlice=createSlice({
  name:"application",
  initialState:{
    applicant:[],
    appliedJob:[]
  },
  reducers:{
    getApplicant:(state,action)=>{
    state.applicant=action.payload;
    },
     getAppliedJob:(state,action)=>{
      state.appliedJob=action.payload;
      }
  }
})
export const {getApplicant,getAppliedJob} =applicationSlice.actions;
export default applicationSlice.reducer;