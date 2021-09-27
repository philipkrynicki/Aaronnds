import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { io } from 'socket.io-client';

// Connect to the socket on the backend server
const socket = io('http://localhost:5000', {transports: ['websocket']});

// This code will be moved
socket.on('updatedBoard', updatedBoard => {
  console.log(updatedBoard);
})

export const getBoardAsync = createAsyncThunk(
  'board/getBoardAsync',
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/boards/${id}`);
    const data = response.data
    return { data }
  })

export const editBoardAsync = createAsyncThunk(
  'board/editBoardAsync',
  async (board) => {
    const response = await axios.put(`/api/boards/${board.id}`, board);
    const data = response.data
    return { data }
  }
)

export const deleteBoardAsync = createAsyncThunk(
  'boards/deleteBoardAsync',
  async (board) => {
    const response = await axios.delete(`http://localhost:5000/api/boards/${board.id}`)
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