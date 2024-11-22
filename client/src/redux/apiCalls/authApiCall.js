import { authActions, authReducer } from "../slices/authSlice";
import axios from "axios";
import request from "../../utils/request";
import { toast } from "react-toastify";

// login Admin
// export function loginUser(user){
//   return async (dispatch)=>{
//     try {

//       const {data} =await request.post("/api/auth/login",user)

//       dispatch(authActions.login(data));
//       localStorage.setItem("userInfo",JSON.stringify(data));
//       localStorage.setItem("token",JSON.stringify(data.token));
//     } catch (error) {
//       toast.error(error.response.data.message);

//     }
//   }
// }

export function loginUser(user) {
  return async (dispatch) => {
    try {
      const response = await request.post("/api/auth/login", user); // Make a POST request to login endpoint

      await dispatch(authActions.login(response.data)); // Dispatch the login action with the user data
      await localStorage.setItem("userInfo", JSON.stringify(response.data)); // Store user info in local storage
      await localStorage.setItem("token", response.data.token); // Store the token in local storage
    } catch (error) {
      toast.error(error.response.data.message); // Display error message using toast
    }
  };
}

// logout Admin
export function logoutUser() {
  return async (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  };
}

// register user
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
