import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './slices/notificationSlice'
import blogSlice from './slices/blogSlice'

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice
  },
})

export default store
