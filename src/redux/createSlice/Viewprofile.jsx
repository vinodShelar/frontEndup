import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_SINGLE_USER } from '../api';
export const getSingleuser = createAsyncThunk(
  'singleuser/getSingleUser',
  async ({id}) => {
    try {
      const response = await axios.get(GET_SINGLE_USER+`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }
);


const singleUserSlice = createSlice({
  name: 'singleuser',
  initialState: {
    singleUser:"",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleuser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(getSingleuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const singleUserReducer = singleUserSlice.reducer;
