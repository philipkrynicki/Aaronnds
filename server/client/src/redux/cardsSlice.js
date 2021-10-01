import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from "../constants/constants";
import socket from '../socket-connect';
import store from './store'
import checkDuplicateIds from '../util-functions/id-check';
import getResponseData from '../util-functions/get-response-data';

socket.on('postComment', comment => {
  store.dispatch(addCommentAsync(comment));
})

socket.on('updateComment', comment => {
  store.dispatch(editCommentAsync(comment));
})

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
    const data = await getResponseData(`${ apiUrl }/cards/${commentObj.card}/comments`, commentObj, 'POST');
    return { data };
  }
)


export const editCommentAsync = createAsyncThunk(
  'cards/editCommentAsync',
  async (commentObj) => {
    const data = await getResponseData(`${ apiUrl }/comments/${commentObj.comment}`, commentObj, 'PUT');
    return { data };
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
    [deleteCardAsync.fulfilled]: (state, action) => {
      //same as boardsSlice question
      return state.filter((card) => card.id !== action.payload.data.id);
    },
    [addActivityAsync.fulfilled]: (state, action) => {
      state.activities.push(action.payload.data)
    },
    [addCommentAsync.fulfilled]: (state, action) => {
      if (checkDuplicateIds(state.comments, action.payload.data._id))
        return state;
      else
        state.comments.push(action.payload.data);
    },
    [editCommentAsync.fulfilled]: (state, action) => {
      const comment = action.payload.data;
      state.comments[state.comments.findIndex(({ _id }) => _id === comment._id)].text = comment.text;
      
    }
  }
});

export default cardsSlice.reducer;