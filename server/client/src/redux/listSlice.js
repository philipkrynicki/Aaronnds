import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from "../constants/constants";

export const getListsAsync = createAsyncThunk(
  'lists/getListsAsync',
  async (id) => {
    const response = await axios.get(`${apiUrl}/boards/${id}/lists`);
    const data = response.data
    return { data }
  })

export const addListAsync = createAsyncThunk(
  'lists/addListAsync',
  async (newListObject) => {
    const response = await axios.post(`http://localhost:5000/api/boards/${newListObject.id}/lists`, newListObject.nameObj)
    const data = response.data
    return { data }
  });

  export const deleteListAsync = createAsyncThunk(
    'lists/deleteListAsync',
  async (id) => {
    const response = await axios.delete(`${apiUrl}/lists/${id}`)
    const data = response.data
    return { data }
  }
) 

const listsSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: { },
  extraReducers: {
    [getListsAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [addListAsync.fulfilled]: (state, action) => {    
      state.push(action.payload.data)
    },
    [deleteListAsync.fulfilled]: (state, action) => {
      //same as boardsSlice question
      return state.filter((list) => list.id !== action.payload.data.id);
    }
  }
});

export default listsSlice.reducer;