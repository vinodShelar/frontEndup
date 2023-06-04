import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./createSlice/getAllusersSlice";
import { userregReducer } from "./createSlice/adduserSlice";
import { updateReducer } from "./createSlice/updateProfile";
import { deleteReducer } from "./createSlice/deleteUser";
import { searchUserReducer } from "./createSlice/searchUsers";
import { singleUserReducer } from "./createSlice/Viewprofile";
import { updateAllReducer } from "./createSlice/updateAllprofile";
const store = configureStore({
  reducer: {
    users: usersReducer,
    userreg: userregReducer,
    update: updateReducer,
    delete: deleteReducer,
    searchUser: searchUserReducer,
    singleuser: singleUserReducer,
    updateAll: updateAllReducer,
  },
});

export default store;
