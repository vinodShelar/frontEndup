import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SEARCH_USERS } from "../api";
import { toast } from "react-toastify";

export const searchUsers = createAsyncThunk("searchUser/Users", async (search) => {

    try {
        const response = await axios.get(SEARCH_USERS, {
            params: {
                q: search,
            },
        });
        toast.success(response.data.message);
        return response.data.users;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
})

const searchSlice = createSlice({
    name: 'searchUser',
    initialState: {
        users: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const searchUserReducer = searchSlice.reducer;