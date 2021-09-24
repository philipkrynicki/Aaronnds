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

export const deleteBoardAsync = createAsyncThunk(
  'boards/deleteBoardAsync',
  async (board) => {
    const response = await axios.delete(`http://localhost:5000/api/boards/${board.id}`)
    return {response}
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
        return action.payload.response.data
      },
      [editBoardAsync.fulfilled]: (state, action) => {
        return action.payload.response.data
      },
      [deleteBoardAsync.fulfilled]: (state, action) => {
        //endpoint returning 'deleted board' should we re get boards here to re render what the db has? 
        return state.filter((board) => board.id !== action.payload.response.data);
      }
    }
  })

 export default boardSlice.reducer; 