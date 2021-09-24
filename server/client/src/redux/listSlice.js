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
  async (boardId, list) => {
    const response = await axios.post(`http://localhost:5000//api/boards/${boardId}/lists`, list)
    return {response}
  });

  export const deleteListAsync = createAsyncThunk(
    'lists/deleteListAsync',
  async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/lists/${id}`)
    return { response }
  }
) 

const listsSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: { },
  extraReducers: {
    [getListsAsync.fulfilled]: (state, action) => {
      console.log(action.payload.response.data)
      return action.payload.response.data
    },
    [addListAsync.fulfilled]: (state, action) => {
      state.push(action.payload.response.data)
    },
    [deleteListAsync.fulfilled]: (state, action) => {
      //same as boardsSlice question
      return state.filter((list) => list.id !== action.payload.response.id);
    }
  }
});

export default listsSlice.reducer;