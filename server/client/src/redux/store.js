import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import boardsReducer from './boardsSlice'
import boardReducer from './boardSlice'
import listsReducer from './listSlice'
import cardsReducer from './cardsSlice'
import userReducer from './userSlice';


const reducers = combineReducers({
  boards: boardsReducer,
  board: boardReducer,
  lists: listsReducer,
  card: cardsReducer,
  user: userReducer
 });

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)


export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !=='production',
  middleware: [thunk],
});