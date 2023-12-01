import { createSlice } from '@reduxjs/toolkit'



export const activeChatSlice = createSlice({
  name: "activeChat",
  initialState: {
    active: "esmearn2301",
  },
  reducers: {
    activeChat: (state, action) => {
      state.active = action.payload;
    },
  },
})

export const { activeChat} = activeChatSlice.actions; 

export default activeChatSlice.reducer