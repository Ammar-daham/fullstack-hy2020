import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  success: '',
  error: '',
  show: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setSuccessNotification(state, action) {
      return { success: action.payload, show: true }
    },
    setErrorNotification(state, action) {
      return { error: action.payload, show: true }
    },
    removeNotification() {
      return { success: '', error: '', show: false }
    },
  },
})

export const setSuccess = (message, duration) => {
  return async (dispatch) => {
    dispatch(setSuccessNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }
}

export const setError = (message, duration) => {
  return async (dispatch) => {
    dispatch(setErrorNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }
}

export const { setErrorNotification, setSuccessNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
