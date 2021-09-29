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
  'board/getBoardAsync',
  async (id) => {
    const response = await axios.get(`${apiUrl}/boards/${id}`);
    const data = response.data
    return { data }
  })

export const editBoardAsync = createAsyncThunk(
  'board/editBoardAsync',
  async (board) => {
    const data = await getResponseData(`${apiUrl}/boards/${board.id}`, board, 'PUT');
    return { data }
  }
)

export const deleteBoardAsync = createAsyncThunk(
  'boards/deleteBoardAsync',
  async (board) => {
    const response = await axios.delete(`${apiUrl}/boards/${board.id}`)
    const data = response.data
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
      },
      [deleteBoardAsync.fulfilled]: (state, action) => {
        return state;
      }
    }
  })

 export default boardSlice.reducer; 