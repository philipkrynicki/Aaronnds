import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../constants/constants";
import socket from '../socket-connect';
import store from './store'

socket.on('updatedBoard', board => {
  store.dispatch(getBoardAsync(board._id));
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
        //may have to use history.push to put you back at workspace page from board individual page
        return state.filter((board) => board.id !== action.payload.data.id);
      }
    }
  })

 export default boardSlice.reducer; 