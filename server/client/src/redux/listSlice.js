import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getListsAsync = createAsyncThunk(
  'boards/getListsAsync',
  async () => {
    const response = await fetch('http://localhost:5000/api/boards/:board/lists', {
      method: 'GET',

    }
    );
    
    if (response.ok) {
      const lists = await response.json();
      console.log(lists)
      return { lists }
    }
  }
)
export const addListAsync = createAsyncThunk(
  'boards/addListAsync',
  async (payload) => {
    const response = await fetch('http://localhost:5000//api/boards/:board/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: payload.name})
    });

    if(response.ok) {
      const list = await response.json();
      return { list };
    }
  }
);

export const deleteListAsync = createAsyncThunk(
  'Lists/deleteListAsync',
  async (payload) => {
    const response = await fetch('http://localhost:5000/api/lists/:list', {
      method: 'DELETE',
    });

    if(response.ok) {
      return { id: payload.id};
    }
  }
) 

const listsSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: { },
  extraReducers: {
    [getListsAsync.fulfilled]: (state, action) => {
      return action.payload.lists
    },
    [addListAsync.fulfilled]: (state, action) => {
      state.push(action.payload.list)
    },
    [deleteListAsync.fulfilled]: (state, action) => {
      return state.filter((list) => list.id !== action.payload.id);
    }
  }
});

export default listsSlice.reducer;