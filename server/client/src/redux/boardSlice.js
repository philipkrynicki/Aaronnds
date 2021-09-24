import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBoardAsync = createAsyncThunk(
  'board/getBoardAsync',
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/boards/${id}`);
    return { response }
  })

export const editBoardAsync = createAsyncThunk(
  'board/editBoardAsync',
  async (board) => {
    const response = await axios.put(`/api/boards/${board.id}`, board);
    return { response }
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
        console.log(action.payload.response.data)
        return action.payload.response.data
      }
    }
  })

 export default boardSlice.reducer; 