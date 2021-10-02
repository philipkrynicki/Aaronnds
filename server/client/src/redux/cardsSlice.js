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
    if (card.name){
      const response = await axios.put(`${apiUrl}/cards/${card.id}`, card.name)
      const data = response.data
      return { data }
    }
    if (card.description){
      const response = await axios.put(`${apiUrl}/cards/${card.id}`, card.description)
      const data = response.data
      return { data }
    }
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
    const response = await axios.put(`${ apiUrl }/comments/${commentObj.comment}`, commentObj)
    
    const data = response.data;
    return { data };
  }
)

export const deleteCommentAsync = createAsyncThunk(
  'cards/deleteCommentAsync',
  async (commentObj) => {
    const response = await axios.delete(`${ apiUrl }/comments/${ commentObj.comment }`, commentObj);
    
    const data = response.data;
    return { data };
    
  }
)

export const addLabelAsync = createAsyncThunk(
  'cards/addLabelAsync',
  async (labelObj) => {
    const response = await axios.post(`${ apiUrl }/cards/${ labelObj.card }/labels`, labelObj.label);
    
    const data = response.data;
    return { data };
  }

)

export const deleteLabelAsync = createAsyncThunk(
  'cards/deleteLabelAsync',
  async (labelObj) => {
    
    const response = await axios.delete(`${ apiUrl }/cards/${ labelObj.card }/labels`, labelObj );
    
    const data = response.data;
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
    [editCardAsync.fulfilled]: (state, action) => { 
      const card = action.payload.data;
      state.name = card.name;
      state.description = card.description;
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
      state.comments.splice((state.comments.indexOf(action.payload.data._id) -1), 1, action.payload.data) 
    },
    [deleteCommentAsync.fulfilled]: (state, action) => {
      state.comments.splice((state.comments.indexOf(action.payload.data) - 1), 1)
    },
    [addLabelAsync.fulfilled]: (state, action) => {
      state.labels.push(action.payload.data)
    },
    [deleteLabelAsync.fulfilled]: (state, action) => {
      state.labels.splice((state.labels.indexOf(action.payload.data)-1), 1)
      
    }
  }
});

export default cardsSlice.reducer;