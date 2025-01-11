import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    darkMode: localStorage.getItem("mode") === "dark" || false
}

export const counterSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    lightMode: state => {
        localStorage.setItem("mode", "")
        state.darkMode = false
    },
    darkModeF: state => {
        state.darkMode = true
        localStorage.setItem("mode", "dark")
    }
  },
})

export const { lightMode, darkModeF } = counterSlice.actions

export default counterSlice.reducer