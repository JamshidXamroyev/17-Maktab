import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../reducers/user';
import ModeReducer from '../reducers/mode';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    mode: ModeReducer,
  },
})