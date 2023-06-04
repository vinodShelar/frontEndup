import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_USER } from "../api";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
    'userRegistration/registerUser',
    async (userData) => {
        try {
            const response = await axios.post(ADD_USER, userData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
            throw new Error(error.message);
        }
    }
);

const userregSlice = createSlice({
    name: 'userRegistration',
    initialState: {
        user: null,
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; 
                state.success = true; 
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(registrationSuccess, (state) => {
                state.success = false;
            });
    },
});

export const userregReducer = userregSlice.reducer;
export const registrationSuccess = createAction('userRegistration/registrationSuccess');
