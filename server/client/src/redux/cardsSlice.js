import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCardsAsync = createAsyncThunk(
  'cards/getCardsAsync',
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/lists/${id}/cards`);
    const data = response.data
    return { data }
  })

export const addCardAsync = createAsyncThunk(
  'cards/addCardAsync',
  async (newCardObj) => {
    const response = await axios.post(`http://localhost:5000/api/lists/${newCardObj.listId}/cards`, newCardObj.name)
    const data = response.data
    return { data }
  });

  export const deleteCardAsync = createAsyncThunk(
    'cards/deleteCardAsync',
  async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/lists/${id}`)
    const data = response.data
    return { data }
  }
) 

const cardsSlice = createSlice({
  name: 'cards',
  initialState: [],
  reducers: { },
  extraReducers: {
    [getCardsAsync.fulfilled]: (state, action) => {
      console.log(action.payload.response.data)
      return action.payload.data
    },
    [addCardAsync.fulfilled]: (state, action) => {
      state.push(action.payload.data)
    },
    [deleteCardAsync.fulfilled]: (state, action) => {
      //same as boardsSlice question
      return state.filter((card) => card.id !== action.payload.data.id);
    }
  }
});

export default cardsSlice.reducer;