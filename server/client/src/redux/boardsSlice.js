import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBoardsAsync = createAsyncThunk(
  'boards/getBoardsAsync',
  async () => {
    const response = await axios.get('http://localhost:5000/api/workspace/boards');
    return { response }
  })

export const addBoardAsync = createAsyncThunk(
  'boards/addBoardsAsync',
  async (board) => {
    const response = await axios.post('http://localhost:5000/api/workspace/boards/', board)
    return {response}
  });



const boardsSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    addBoard: (state, action) => {
      const newBoard = {
        name: action.payload.name,
      }
      state.push(newBoard);
    },

  },
  extraReducers: {
    [getBoardsAsync.fulfilled]: (state, action) => {
      return action.payload.response.data
    },
    [addBoardAsync.fulfilled]: (state, action) => {
      state.push(action.payload.response.data)
    },
  }
});


export const { addBoard } = boardsSlice.actions;

export default boardsSlice.reducer;