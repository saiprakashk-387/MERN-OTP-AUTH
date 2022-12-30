import { createSlice } from "@reduxjs/toolkit";

const sampleSlice = createSlice({
    name: 'auth',
    initialState: {
      ///auth//
      CreateAccount: {},
    ///admin
    AllUsersList:{},
    DeleteUser:{},
      isLoading:true,
    },
    ///reducer
    reducers: {    
      ///action 
      ////auth///
      CreateAccountAction: (state, { payload }) => {
        state.CreateAccount = payload;
        state.isLoading=false;
      } ,
        ///admin
        AdminAllUsersListAction:(state,{payload})=>{
          state.AllUsersList= payload;
          state.isLoading=false;
        },
        AdminDeleteUserAction:(state,{payload})=>{
          state.DeleteUser= payload;
          state.isLoading=false;
        }
    },
  });

  export const {
    CreateAccountAction ,AdminAllUsersListAction ,AdminDeleteUserAction} = sampleSlice.actions;
  ///assign state to selector

  //auth////
export const CreateAccountSelector = (state) => state.auth;
export const AdminAllUsersListSelector = (state) => state.auth;
export const AdminDeleteUserSelector = (state) => state.auth;


//export reducer
const sampleReducer = sampleSlice.reducer;
export default sampleReducer;