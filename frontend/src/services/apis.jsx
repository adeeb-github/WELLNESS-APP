

const BASE_URL="http://localhost:4000";

//AUTH ENDPOINTS
export const endpoints={
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login",

}
export const sessionendpoints = {
    CREATE_SESSION_API: BASE_URL + "/session/createsession",
   

}

export const getsessionendpoints={
     ALL_SESSION_API:BASE_URL+ "/session/sessions",
    
}

export const mysessionendpoints={
     MY_SESSION_API:BASE_URL+"/session/my-sessions",
}
export const deleteendpoints={
    DELETE_SESSION_API:BASE_URL+"/session/delete",
    
}

export const addendpoints={
    ADD_SESSION_API:BASE_URL+"/session/publish",
}