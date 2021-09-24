import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getListsAsync = createAsyncThunk(
  'lists/getListsAsync',
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/boards/${id}/lists`);
    return { response }
  })

export const addListAsync = createAsyncThunk(
  'lists/addListAsync',
  async (id) => {
    const response = await axios.post(`http://localhost:5000//api/boards/${id}/lists`)
    return {response}
  });

  export const deleteListAsync = createAsyncThunk(
    'lists/deleteListAsync',
  async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/lists/${id}`)
    return {response}
  }
) 

const listsSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: { },
  extraReducers: {
    [getListsAsync.fulfilled]: (state, action) => {
      console.log(action.payload.response.data)
      return action.payload.response.lists
    },
    [addListAsync.fulfilled]: (state, action) => {
      state.push(action.payload.response.list)
    },
    [deleteListAsync.fulfilled]: (state, action) => {
      return state.filter((list) => list.id !== action.payload.response.id);
    }
  }
});

export default listsSlice.reducer;