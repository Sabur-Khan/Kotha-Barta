import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice/userSlice'
import activeChatSlice from './userSlice/activeChatSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    activeChatSlice: activeChatSlice,
  },
})

export default store