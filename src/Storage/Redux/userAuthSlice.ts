import {createSlice} from "@reduxjs/toolkit";
import userModel from "../../Interfaces/userModel";

export const emptyUserState: userModel = {
    id: "", 
    name: "",   
    email: "",
    role: "",
    phoneNumber: "",

  };
  
  export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: emptyUserState,
    reducers: {
      setLoggedInUser: (state, action) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.role = action.payload.role;
        state.phoneNumber = action.payload.phoneNumber;
      },
    },
  });


export const {setLoggedInUser} = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer; 