import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from "../constants/constants";
import socket from '../socket-connect';
import store from './store';
import checkDuplicateIds from '../util-functions/id-check';
import getResponseData from '../util-functions/get-response-data';

socket.on('newList', list => {
  store.dispatch(addListAsync(list));
})

socket.on('updateList', list => {
  store.dispatch(editListAsync(list));
})

socket.on('deleteList', data => {
  store.dispatch(removeListAsync(data));
})
  
socket.on('newCard', card => {
  store.dispatch(addCardAsync(card));
})

export const getListsAsync = createAsyncThunk(
  'lists/getListsAsync',
  async (id) => {
    const response = await axios.get(`${apiUrl}/boards/${id}/lists`);
    const data = response.data
    return { data }
  })

export const addListAsync = createAsyncThunk(
  'lists/addListAsync',
  async (newListObject) => {
    const data = await getResponseData(`${apiUrl}/boards/${newListObject.id}/lists`, newListObject, 'POST')
    return { data }
  }
);

export const deleteListAsync = createAsyncThunk(
  'lists/deleteListAsync',
  async (id) => {
    const response = await axios.delete(`${apiUrl}/lists/${id}`);
    const data = response.data;
    store.dispatch(removeListAsync(data)); // dispatch removeListAsync with the response id
  }
)

// Function that sends id of list to be removed from the state witout making an api request
const removeListAsync = createAsyncThunk(
  'lists/removeListAsync',
  async(data) => {
    return { data };
  }
)

export const editListAsync = createAsyncThunk(
  'lists/editListAsync',
  async (listObj) => {
    const data = await getResponseData(`${apiUrl}/lists/${listObj.id}`, listObj, 'PUT');
    return { data }
  }
);

export const addCardAsync = createAsyncThunk(
  'cards/addCardAsync',
  async (newCardObject) => {
    console.log(newCardObject)
    const data = await getResponseData(`${apiUrl}/lists/${newCardObject.listID}/cards`, newCardObject, 'POST');
    return { data };
  });

  export const moveCardAsync = createAsyncThunk(
    'cards/moveCardAsync',
    async (card) => {
      const response = await axios.put(`${apiUrl}/lists/${card.list}/cards/${card.id}`, card.destList)
      store.dispatch(getListsAsync(response.data.updatedList.board))
      
    }
  )

const listsSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: { },
  extraReducers: {
    [getListsAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [addListAsync.fulfilled]: (state, action) => {
      if (checkDuplicateIds(state, action.payload.data._id))
        return state;
      else
        state.push(action.payload.data);
    },
    [removeListAsync.fulfilled]: (state, action) => {
      return state.filter((list) => list._id !== action.payload.data);
    },
    [editListAsync.fulfilled]: (state, action) => {
      const list = action.payload.data;
      state[state.findIndex(({ _id }) => _id === list._id)].name = list.name;
    },
    [addCardAsync.fulfilled]: (state, action) => {
      const cards = state[state.findIndex(({ _id }) => _id === action.payload.data.list)].cards;

      if (checkDuplicateIds(cards, action.payload.data._id))
        return state;
      else
        cards.push(action.payload.data);

    },
  }
});

export default listsSlice.reducer;