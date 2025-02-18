// const { createSlice } = require("@reduxjs/toolkit");
  import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
let jobSlice=createSlice({
  name:"job",
  initialState:{
    allJob:[],
    oneJob:null,
    adminJob:[],
    Query:"",
    filter:{},
    fav:[]
  },
  reducers:{
     setAlljob:(state,action)=>{
       state.allJob=action.payload
     },
     getOnejob:(state,action)=>{
      state.oneJob=action.payload
     },
     setadminJob:(state,action)=>{
      state.adminJob=action.payload
     },
     setInputQuery:(state,action)=>{
      state.Query=action.payload
     },
     setFilters:(state,action)=>{
      state.filter=action.payload
     },
     setFav:(state,action)=>{
      state.fav=action.payload
     },
     
  }
})
export const {setAlljob,getOnejob,setadminJob,setInputQuery,setFilters,setFav}=jobSlice.actions;
export default jobSlice.reducer;