import { createSlice } from '@reduxjs/toolkit';

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
});

export const { addBoard } =boardSlice.actions;

export default boardSlice.reducer;