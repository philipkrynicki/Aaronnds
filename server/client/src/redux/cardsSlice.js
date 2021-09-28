import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from "../constants/constants";

export const getCardsAsync = createAsyncThunk(
  'cards/getCardsAsync',
  async (id) => {
    const response = await axios.get(`${apiUrl}/lists/${id}/cards`);
    const data = response.data
    return { data }
  })

export const addCardAsync = createAsyncThunk(
  'cards/addCardAsync',
  async (listId, card) => {
    const response = await axios.post(`${apiUrl}/lists/${listId}/cards`, card)
    const data = response.data
    return { data }
  });

  export const deleteCardAsync = createAsyncThunk(
    'cards/deleteCardAsync',
  async (id) => {
    const response = await axios.delete(`${apiUrl}/cards/${id}`)
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