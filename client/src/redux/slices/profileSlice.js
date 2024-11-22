// @ts-nocheck
import  {createSlice}from "@reduxjs/toolkit"


const profileSlice= createSlice({
  name :"profile",
  initialState:{
    profile:null,
    loading: false,
    isProfileDeleted:false,
    usersCount:null,
    profiles:[],
  
  },

  reducers :{
    setProfile(state,action){
      state.profile=action.payload;
    },
     setProfilePhoto(state,action){
      state.profile=action.payload;
     },
    updateProfile(state,action){
      state.profile=action.payload;
    },
    setLoding(state){
      state.loading=true;
    },
    clearLoding(state){
      state.loading=false;
    },
    setProfileDelete(state){
      state.isProfileDeleted=true;
      state.loading=false;
    },
    clearIsProfileDelete(state){
      state.isProfileDeleted=true;
      state.loading=false;
    },
    setUserCount(state,action){
      state.usersCount=action.payload;
    },
    setProfiles(state,action){
      state.profiles=action.payload;
    }


    
  
  }
});


const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;


export {profileActions,profileReducer}













