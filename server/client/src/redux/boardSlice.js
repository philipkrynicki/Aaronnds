import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../constants/constants";
import socket from '../socket-connect';
import store from './store'
import getResponseData from '../util-functions/get-response-data';

socket.on('updatedBoard', board => {
  store.dispatch(editBoardAsync(board));
})

export const getBoardAsync = createAsyncThunk(
  'getBoardAsync',
  async (id) => {
    const response = await axios.get(`api/boards/${id}`);
    const data = response.data
    return { data }
  })

export const editBoardAsync = createAsyncThunk(
  'editBoardAsync',
  async (board) => {
    const data = await getResponseData(`api/boards/${board.id}`, board, 'PUT');
    return { data }
  }
)

const boardSlice = createSlice({
  name:'board',
  initialState: { },
  reducers: {},
  extraReducers: {
    [getBoardAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [editBoardAsync.fulfilled]: (state, action) => {
      return action.payload.data
    }
  }
})

 export default boardSlice.reducer; 