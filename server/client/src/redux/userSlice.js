import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getResponseData from '../util-functions/get-response-data';

export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async(user) => {
    const data = await getResponseData(`http://localhost:5000/auth/login`, user, 'POST');
    localStorage.setItem('token', data.token);
    return { data };
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
      return { ...state, authenticated: action.payload.token,
        userName: action.payload.name || null
      };
    }
  }
})

export default userSlice.reducer;