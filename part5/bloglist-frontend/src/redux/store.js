import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './slices/notificationSlice'
import blogSlice from './slices/blogSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
  reducer: {
    notifications: notificationSlice,
    blogs: blogSlice,
    users: userSlice
  },
})

export default store
