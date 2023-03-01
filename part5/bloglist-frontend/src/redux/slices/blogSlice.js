import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const url = '/api/blogs/'

const initialState = {
  success: '',
  error: '',
  blogsList: [],
}

let token = null
let config = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

export const allBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axios.get(url)
  return response.data
})

export const createBlog = createAsyncThunk(
  'blogs/newBlog',
  async (blog, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, blog, config)
      console.log('data create: ', response.data)
      return response.data
    } catch (error) {
      const errorMessage = error.response.data.error
      return rejectWithValue(errorMessage)
    }
  },
)

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    sortByLikes: (state) => {
      state.blogsList.sort((a, b) => b.likes - a.likes)
    },
  },

  extraReducers: (builder) => {
    builder.addCase(allBlogs.pending, (state) => {
      return {
        ...state,
        success: 'pending',
      }
    })
    builder.addCase(allBlogs.fulfilled, (state, action) => {
      return {
        ...state,
        blogsList: action.payload,
        success: 'success',
      }
    })
    builder.addCase(allBlogs.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      }
    })
    builder.addCase(createBlog.pending, (state) => {
      return {
        ...state,
        success: 'pending',
      }
    })
    builder.addCase(createBlog.fulfilled, (state, action) => {
      console.log('payload: ', action.payload)
      return {
        ...state,
        blogsList: [...state.blogsList, action.payload],
        success: 'success',
      }
    })
    builder.addCase(createBlog.rejected, (state, action) => {
      console.log('payload: ', action)
      return {
        ...state,
        success: '',
        error: action.payload,
      }
    })
  },
})

export const { sortByLikes } = blogSlice.actions
export default blogSlice.reducer
