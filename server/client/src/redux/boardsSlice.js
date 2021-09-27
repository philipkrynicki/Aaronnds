import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBoardsAsync = createAsyncThunk(
  'boards/getBoardsAsync',
  async () => {
    const response = await axios.get('http://localhost:5000/api/workspace/boards');
    const data = response.data
    return { data }
  })

export const addBoardAsync = createAsyncThunk(
  'boards/addBoardAsync',
  async (board) => {
    const response = await axios.post('http://localhost:5000/api/workspace/boards/', board)
    const data = response.data
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
      state.push(action.payload.data)
    },
  }
});


export const { addBoard } = boardsSlice.actions;

export default boardsSlice.reducer;