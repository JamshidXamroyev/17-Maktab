import { createSlice } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || false,
    admin: localStorage.getItem("admin") === "have got" || false
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      const user = action.payload
      state.user = user
      const userData = JSON.stringify(user)
      localStorage.setItem("user", userData)
      if(user._id == "6780a16303e4147c822137c3"){
        state.admin = true
        localStorage.setItem("admin", "have got")
      }
    },

    logoutUser: (state) => {
      state.user = false
      state.admin = false
      localStorage.removeItem("admin")
      localStorage.removeItem("user")
      localStorage.removeItem("mode")
    }
  },
})

export const { getUser, logoutUser } = counterSlice.actions

export default counterSlice.reducer