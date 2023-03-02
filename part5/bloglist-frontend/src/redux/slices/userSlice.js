import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const loginUrl = '/api/login'
const baseUrl = '/api/users'

const initialState = {
  success: '',
  error: '',
  user: [],
  usersList: []
}

export const fetchAll = createAsyncThunk(
  'users/fetchAll',
  async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }
)

export const login = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(loginUrl, credentials)
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
    builder.addCase(fetchAll.pending, (state) => {
      return {
        ...state
      }
    })
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      return {
        ...state,
        usersList: action.payload
      }
    })
    builder.addCase(fetchAll.rejected, (state) => {
      return {
        ...state
      }
    })
  },
})

export const { resetUser, setUser } = userSlice.actions
export default userSlice.reducer
