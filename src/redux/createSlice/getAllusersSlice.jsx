import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_ALL_USERS } from '../api';
export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async () => {
    try {
      const response = await axios.get(GET_ALL_USERS);
      return response.data.users;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }
);


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const usersReducer = usersSlice.reducer;
