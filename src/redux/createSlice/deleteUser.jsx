import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { DELETE_USER } from "../api";

export const deleteUser = createAsyncThunk("delete/deleteUser", async ({id}) => {
    console.log(id)
    try {
        const response = await axios.delete(DELETE_USER + `/${id}`);
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error.message);
        console.log(error)
        throw new Error(error.message);
    }
})

const deleteUserSlice = createSlice({
    name: 'delete',
    initialState: {
        delete: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.delete = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const deleteReducer = deleteUserSlice.reducer;