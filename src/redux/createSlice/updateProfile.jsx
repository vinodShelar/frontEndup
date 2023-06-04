import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UPDATE_API } from "../api";
import { toast } from "react-toastify";

export const updateProfile = createAsyncThunk("update/updateProfile", async ({ status, id }) => {
   
    try {
        const response = await axios.put(UPDATE_API+`/${id}`, { status }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
})

const updateProSlice = createSlice({
    name: 'update',
    initialState: {
        update: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.update = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const updateReducer = updateProSlice.reducer;