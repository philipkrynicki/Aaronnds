import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../constants/constants";
import socket from '../socket-connect';
import store from './store';


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
    let data = {};

    if (board.hasOwnProperty('_id')) {
      data = board;
    } else {
      const response = await axios.put(`${apiUrl}/boards/${board.id}`, board.nameObj);
      data = response.data;    
    }
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
    initialState: {
      _id: 1
    },
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