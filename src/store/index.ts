import { configureStore } from '@reduxjs/toolkit'
import menuSlice from './menu/menuSlice';
import modalSlice from './modal/modalSlice';
import notesListSlice from './notesList/notesListSlice';
import tagsSlice from './tags/tagsSlice';

export const store = configureStore({
  reducer: {
    menuSlice,
    modalSlice,
    notesListSlice,
    tagsSlice,
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;