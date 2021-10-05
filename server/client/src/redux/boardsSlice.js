import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import socket from '../socket-connect';
import store from './store'
import { apiUrl } from "../constants/constants";
import checkDuplicateIds from '../util-functions/id-check';
import getResponseData from '../util-functions/get-response-data';

// Listen for when a new board is posted
// All socket listeners may be moved to their own file(s) in the future
socket.on('newBoard', board => {
  store.dispatch(addBoardAsync(board));
})

// Refresh when a board is updated
socket.on('updatedBoard', () => {
  store.dispatch(getBoardsAsync());
})

socket.on('deleteBoard', data => {
  store.dispatch(removeBoardAsync(data));
}) 

export const getBoardsAsync = createAsyncThunk(
  'boards/getBoardsAsync',
  async () => {
    const response = await axios.get(`api/workspace/boards`);
    const data = response.data
    return { data }
  })

export const addBoardAsync = createAsyncThunk(
  'boards/addBoardAsync',
  async (board) => {
    const data = await getResponseData(`api/workspace/boards/`, board, 'POST');
    return { data };
  }
)

export const deleteBoardAsync = createAsyncThunk(
  'boards/deleteBoardAsync',
  async (board) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }

    const response = await axios.delete(`api/boards/${board.id}`, config);
    const data = response.data;
    store.dispatch(removeBoardAsync(data));
  }
) 

const removeBoardAsync = createAsyncThunk(
  'boards/removeBoardAsync',
  async(data) => {
    return { data }; 
  }
)

const boardsSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getBoardsAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [addBoardAsync.fulfilled]: (state, action) => {
      if (checkDuplicateIds(state, action.payload.data._id))
        return state;
      else
        state.push(action.payload.data);
    },
    [removeBoardAsync.fulfilled]: (state, action) => {
      return state.filter((board) => board._id !== action.payload.data);
    }
  }
});


export const { addBoard } = boardsSlice.actions;

export default boardsSlice.reducer;