import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { setLoading ,setToken} from "../../slices/authSlice"
import { endpoints } from "../apis";
import axios from "axios";
import {setUser} from "../../slices/profileSlice";

const{SIGNUP_API,LOGIN_API}=endpoints;

export function signup(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    about,
    navigate
){
    return async(dispatch)=>{
        const toastId=toast.loading("Signing up...");
        dispatch(setLoading(true))
        try{
             const response = await apiConnector("POST",SIGNUP_API,{
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    about,
  });

            console.log("signup respose",response)
            if(!response.data.success){
               throw new Error(response.data.message || "Signup failed");
            }
            
            toast.success("signup successfull.You can now login")
            navigate("/login")

        }
        catch(error){
            console.error("Signup error:", error);
           
            toast.error("An error occurred during signup. Please try again.");
            navigate("/signup")
        }
        dispatch(setLoading(false))
    toast.dismiss(toastId)
        
        
    }

}

export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Logging in...");
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            console.log("login response", response);
            if(!response.data.success){
                throw new Error(response.data.message || "Login failed");
            }
            toast.success("Login successful");
            dispatch(setToken(response.data.token))
             dispatch(setUser({ ...response.data.user, token: response.data.token }));
             
      localStorage.setItem("token", response.data.token); // plain string



            navigate("/dashboard/my-profile");

        } catch(error) {
            console.error("Login error:", error);
            toast.error(" Please Register Yourself First");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
   
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
