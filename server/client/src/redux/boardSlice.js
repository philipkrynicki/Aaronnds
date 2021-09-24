import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBoardsAsync = createAsyncThunk(
  'boards/getBoardsAsync',
  async () => {
    const response = await fetch('http://localhost:5000/api/workspace/boards');
    
    if (response.ok) {
      const boards = await response.json();
      console.log(boards)
      console.log('hello')
      return { boards }
    }
  }
)

export const addBoardAsync = createAsyncThunk(
  'boards/addBoardsAsync',
  async (payload) => {
    const response = await fetch('api post address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: payload.name})
    });

    if(response.ok) {
      const board = await response.json();
      return { board };
    }
  }
);

export const deleteBoardAsync = createAsyncThunk(
  'boards/deleteBoardAsync',
  async (payload) => {
    const response = await fetch('api delete address', {
      method: 'DELETE',
    });

    if(response.ok) {
      return { id: payload.id};
    }
  }
) 

const boardsSlice = createSlice({
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
    },
    [addBoardAsync.fulfilled]: (state, action) => {
      state.push(action.payload.board)
    },
    [deleteBoardAsync.fulfilled]: (state, action) => {
      return state.filter((board) => board.id !== action.payload.id);
    }
  }
});


export const { addBoard } = boardsSlice.actions;

export default boardsSlice.reducer;