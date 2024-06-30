import { createSlice } from "@reduxjs/toolkit";

//This reducer is made to track user-authentication.
//User authenticate kiya hai ki nahi.

const initialState = {
    status : false, // abhi user authenticate nahi hai
    userData: null
}

const authSlice=createSlice({
    //takes object
    //Every 'Slice' has a name,intial state and reducers.
    name:"auth",
    initialState:initialState,
    reducers:{
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

//1st export individual functionality :-
export const {login, logout} = authSlice.actions;

//2nd 'store' want every reducers
export default authSlice.reducer;