import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getResponseData from '../util-functions/get-response-data';

export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async(user) => {
    const data = await getResponseData(`auth/login`, user, 'POST');
    localStorage.setItem('token', data.token);
    return { data };
  }
)

export const logoutAsync = createAsyncThunk(
  'user/logoutAsync',
  async() => {
    localStorage.setItem('token', '');
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    authenticated: localStorage.getItem('token') || '',
    errorMessage: '',
    userName: null
  },
  reducers: {},
  extraReducers: {
    [loginAsync.fulfilled]: (state, action) => {
      state.authenticated = localStorage.getItem('token');
    },
    [logoutAsync.fulfilled]: (state) => {
      state.authenticated = '';
    }
  }
})

export default userSlice.reducer;