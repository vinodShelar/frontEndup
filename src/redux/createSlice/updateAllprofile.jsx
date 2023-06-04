import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UPDATE_API } from "../api";
import { toast } from "react-toastify";

export const updateProfileAll = createAsyncThunk("updateData/updateProfile", async ({ firstName, lastName, location, phone, email, gender, status,profilePic, id }) => {
    try {
        const response = await axios.put(UPDATE_API + `/${id?.id}`, { firstName, lastName, location, phone, email, gender, status,profilePic }, {
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

const updateAllProSlice = createSlice({
    name: 'updateAll',
    initialState: {
        updateAll: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateProfileAll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfileAll.fulfilled, (state, action) => {
                state.loading = false;
                state.updateAll = action.payload;
            })
            .addCase(updateProfileAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const updateAllReducer = updateAllProSlice.reducer;