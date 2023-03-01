import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = '/api/login'

const initialState = {
  success: '',
  error: '',
  user: [],
}

export const login = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl, credentials)
      return response.data
    } catch (error) {
      const errorMessage = error.response.data.error
      return rejectWithValue(errorMessage)
    }
  },
)

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      return {
        ...state,
        success: 'pending',
      }
    })
    builder.addCase(login.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        success: 'success',
      }
    })
    builder.addCase(login.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      }
    })
  },
})

export const { resetUser, setUser } = userSlice.actions
export default userSlice.reducer
