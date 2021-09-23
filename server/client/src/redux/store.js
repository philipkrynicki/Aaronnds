import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './boardSlice'
import listsReducer from './listSlice'

export default configureStore({
  reducer: {
   boards: boardsReducer,
   lists: listsReducer
  }
});