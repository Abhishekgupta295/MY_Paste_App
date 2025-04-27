import { configureStore } from '@reduxjs/toolkit'
import { PasteSlice } from './Slices/PasteSlice'

export const store = configureStore({
  reducer: {
    Paste : PasteSlice.reducer,
  },
})