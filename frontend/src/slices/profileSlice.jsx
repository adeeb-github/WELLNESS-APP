import {createSlice} from '@reduxjs/toolkit';
import { setLoading } from './authSlice';

const initialState={
    user:null,
    loading:false
 

};

const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload;
        }
       
        
    }

})
export const{setUser}=profileSlice.actions;
export default profileSlice.reducer;