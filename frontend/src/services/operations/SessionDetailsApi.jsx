import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { setLoading } from "../../slices/authSlice";
import {mysessionendpoints, sessionendpoints}from "../apis";
import { getsessionendpoints } from "../apis";
import { deleteendpoints } from "../apis";
import { addendpoints } from "../apis";
const { CREATE_SESSION_API}=sessionendpoints;
const {ALL_SESSION_API}=getsessionendpoints;
const {MY_SESSION_API}=mysessionendpoints;
const{DELETE_SESSION_API }=deleteendpoints;
const{ADD_SESSION_API}=addendpoints;

export function createSession(sessionData) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating session...");
    dispatch(setLoading(true));

    try {
      const token = (localStorage.getItem("token")); 
      console.log("Token:", token);
      console.log("Session Data:", sessionData);
      console.log("Session API Endpoint:", CREATE_SESSION_API);

      const response = await apiConnector(
        "POST",
        CREATE_SESSION_API,
        sessionData,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );

      console.log("Response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message || "Session creation failed");
      }

      
      if (sessionData.status === "published") {
        toast.success("Session Published successfully!");
      } else if (sessionData.status === "draft") {
        toast.success("Draft saved successfully!");
      }
    } catch (error) {
      console.error("Session creation error:", error);
      toast.error("Failed to create session. Please try again.");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export const getSessionData = async () => {
  const toastId = toast.loading("Fetching sessions...");

  let result = null;

  try {
    console.log("inside getsession");
    console.log("sessionendpoints:", sessionendpoints);
    console.log("ALL_SESSION_API:", ALL_SESSION_API);

    const response = await apiConnector("GET", ALL_SESSION_API);

    if (!response.data.success) {
      throw new Error(response.data.message || "Cannot fetch sessions");
    }

    toast.success("Let’s get started! Here are your sessions");
    result = response.data.data;
    
  } catch (error) {
    console.error("Session Fetching Error:", error);
    toast.error("No Sessions Availaible");
    result = error.response.data;
  }

  toast.dismiss(toastId);

  return result;
};
export const getMySessionData = async (userid) => {

  const toastId = toast.loading("Fetching sessions...");
  let result = null;

  try {
    console.log("userid",userid);
    console.log("inside getmysession");
    console.log("MY_SESSION_API:", MY_SESSION_API);

    const response = await apiConnector(
      "GET",
      `${MY_SESSION_API}?userid=${userid}` 
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Cannot fetch sessions");
    }

    toast.success("Your sessions are ready!");
    result = response.data.data;
  } catch (error) {
    console.error("Session Fetching Error:", error);
    toast.error("No sessions Availaible");
    result = error?.response?.data;
  }

  toast.dismiss(toastId);
  return result;
};

export function deletesession(sessionid)
{
  return async(dispatch)=>{
    const toastId=toast.loading("Deleting Session"); 
    dispatch(setLoading(true));
    try{
      const response=await apiConnector("DELETE",`${DELETE_SESSION_API}/${sessionid}`);

      if(!response.data.success)
      {
        throw new Error(response.data.message||"Cannot delete");
      }

      toast.success("Session deleted Successfully");
    } 
    catch(error)
  {
    console.error(error);
    toast.error("Cannot delete Session");
    
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
  

  }
 
  
}

export function addsession(sessionid)
{
  return async(dispatch)=>{
    const toastId=toast.loading("Publishing Session"); 
    dispatch(setLoading(true));
    try{
      const response=await apiConnector("PUT",`${ADD_SESSION_API}/${sessionid}`);

      if(!response.data.success)
      {
        throw new Error(response.data.message||"Cannot publish");
      }

      toast.success("Session Published Successfully");
    } 
    catch(error)
  {
    console.error(error);
    toast.error("Cannot publish Session");
    
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
  

  }
 
  
}