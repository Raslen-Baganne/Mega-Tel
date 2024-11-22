import { profileActions } from "../slices/profileSlice";

import request from "../../utils/request";
import { toast } from "react-toastify";


// get user profile
export function getUserprofile(userId){
  return async (dispatch)=>{
    try {
      
      const {data} =await request.get(`/api/profile/${userId}`)


      dispatch(profileActions.setProfile(data));

    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  }
}




// //get users count
// export function deleteProfile(userId){
//   return async(dispatch,getState)=>{
//     try {
//       dispatch(profileActions.setLoding());
//       const {data}=await request.delete(
//         `/api/users/profile/${userId}`,
//         {
//           headers:{
//             Authorization:"Bearer"+getState().auth.user.token,
//           },
//         }
//       );
//       dispatch(profileActions.setProfileDelete(data));
//       toast.success(data?.message);
//       setTimeout(()=>dispatch(profileActions.clearIsProfileDelete()),2000);
//     } catch (error) {
  // toast.error(error.response.data.message);
  // dispatch(profileActions.clearLoding())
//     }
//   }
// }



//get users count
export function getUserCount(){
  return async(dispatch,getState)=>{
    try {

      const {data}=await request.get(
        `/api/users/count`,
        {
          headers:{
            Authorization:"Bearer"+getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setUserCount(data));
    
    } catch (error) {
      toast.error(error.response.data.message);
    
    }
  }
}


//get  all users 
export function getAllUserProfile(){
  return async(dispatch,getState)=>{
    try {const storedUser = JSON.parse(localStorage.getItem("userInfo"));

      const {data}=await request.get(
        `/api/users/profile`,
        {
          headers:{
            Authorization:"Bearer"+getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setProfile(data));
    
    } catch (error) {
      toast.error(error.response.data.message);
    
    }
  }
}
