import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBoardsAsync = createAsyncThunk(
  'boards/getBoardsAsync',
  async () => {
    const response = await fetch('api address');
    if (response.ok) {
      const boards = await response.json();
      return { boards }
    }
  }
)

const boardSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    addBoard: (state, action) => {
      const newBoard = {
        id: Math.floor(1000 + Math.random() * 9000),
        name: action.payload.name,
      }
      state.push(newBoard);
    },

  },
  extraReducers: {
    [getBoardsAsync.fulfilled]: (state, action) => {
      return action.payload.boards
    }
  }
});

export const { addBoard } = boardSlice.actions;

export default boardSlice.reducer;