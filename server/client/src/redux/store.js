import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './boardsSlice'
import boardReducer from './boardSlice'
import listsReducer from './listSlice'

export default configureStore({
  reducer: {
   boards: boardsReducer,
   board: boardReducer,
   lists: listsReducer
  }
});