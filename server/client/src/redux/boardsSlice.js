import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import socket from '../socket-connect';
import store from './store'
import { apiUrl } from "../constants/constants";
import checkDuplicateIds from '../util-functions/id-check';
import getPostData from '../util-functions/get-response-data';

// Listen for when a new board is posted
// All socket listeners may be moved to their own file(s) in the future
socket.on('newBoard', board => {
  store.dispatch(addBoardAsync(board));
})

// Refresh when a board is updated
socket.on('updatedBoard', () => {
  store.dispatch(getBoardsAsync());
})

export const getBoardsAsync = createAsyncThunk(
  'boards/getBoardsAsync',
  async () => {
    const response = await axios.get(`${apiUrl}/workspace/boards`);
    const data = response.data
    return { data }
  })

export const addBoardAsync = createAsyncThunk(
  'boards/addBoardAsync',
  async (board) => {
    const data = await getPostData(`${apiUrl}/workspace/boards/`, board);
    return { data }
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
  }
});


export const { addBoard } = boardsSlice.actions;

export default boardsSlice.reducer;