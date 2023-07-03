import { createSlice } from "@reduxjs/toolkit";
// let loginStatus = (localStorage.getItem("isLogin"))?true:false;
let loginStatus = false;
if(localStorage.getItem("isLogin") == "true") loginStatus= true;
let authSlice = createSlice({
    name:"globalAuth",
    initialState:loginStatus,
    reducers:{
        setAuthTrue:(state,action)=>{
            state = true;
        },
        setAuthFalse:(state,action)=>{
            state = false;
        }
    }
})
export default authSlice.reducer;