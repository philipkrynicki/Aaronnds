import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './boardSlice'

export default configureStore({
  reducer: {
   boards: boardsReducer
  }
});