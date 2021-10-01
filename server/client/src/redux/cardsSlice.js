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


export const getCardAsync = createAsyncThunk(
  'cards/getCardAsync',
  async (id) => {
    const response = await axios.get(`${apiUrl}/cards/${id}`)

    const data = response.data
    return { data }
  }
)


export const deleteCardAsync = createAsyncThunk(
    'cards/deleteCardAsync',
  async (id) => {
    const response = await axios.delete(`${apiUrl}/cards/${id}`)
    const data = response.data
    return { data }
  }
) 

export const editCardAsync = createAsyncThunk(
    'cards/editCardAsync',
  async (card) => {
    const response = await axios.put(`${apiUrl}/cards/${card.id}`, card)
    const data = response.data
    return { data }
  }
)


export const addActivityAsync = createAsyncThunk(
  'cards/addActivityAsync',
  async (activityObj) => {
    const response = await axios.post(`${ apiUrl }/cards/${ activityObj.card }/activity`, activityObj.activity)
    
    const data = response.data;

    return { data }
  }
)

export const addCommentAsync = createAsyncThunk(
  'cards/addCommentAsync',
  async (commentObj) => {
    
    const response = await axios.post(`${ apiUrl }/cards/${commentObj.card}/comments`, commentObj)
    
    const data = response.data
    return { data }
  }
)


const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    labels:[],
    activities: [],
    comments: []
  },
  reducers: { },
  extraReducers: {
    [getCardsAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [getCardAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [addActivityAsync.fulfilled]: (state, action) => {
      state.activities.push(action.payload.data)
    },
    [addCommentAsync.fulfilled]: (state, action) => {
      
      state.comments.push(action.payload.data);
    }
  }
});

export default cardsSlice.reducer;