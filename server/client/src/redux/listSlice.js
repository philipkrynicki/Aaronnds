import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from "../constants/constants";
import socket from '../socket-connect';
import store from './store';
import checkDuplicateIds from '../util-functions/id-check';

socket.on('newList', list => {
  store.dispatch(addListAsync(list));
})

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
    let data = {};

    if (newListObject.hasOwnProperty('_id')) {
      data = newListObject;
    } else {
      const response = await axios.post(`${apiUrl}/boards/${newListObject.id}/lists`, newListObject.nameObj)
      data = response.data
    }
    
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

      if (checkDuplicateIds(state, action.payload.data._id))
        return state
      else
        state.push(action.payload.data)
    },
    [deleteListAsync.fulfilled]: (state, action) => {
      //same as boardsSlice question
      return state.filter((list) => list.id !== action.payload.data.id);
    }
  }
});

export default listsSlice.reducer;