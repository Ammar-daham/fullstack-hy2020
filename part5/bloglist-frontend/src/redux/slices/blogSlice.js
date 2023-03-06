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
      return response.data
    } catch (error) {
      const errorMessage = error.response.data.error
      return rejectWithValue(errorMessage)
    }
  },
)

export const removeBlog = createAsyncThunk(
  'blogs/removeBlog',
  async (blog, { rejectWithValue }) => {
    try {
      const response = await axios.delete(url + blog.id, config)
      return response.data
    } catch (error) {
      const errorMessage = error.response.data.error
      return rejectWithValue(errorMessage)
    }
  },
)

export const likeBlog = createAsyncThunk(
  'blogs/likeBlog',
  async (updatedBlog, { rejectWithValue }) => {
    try {
      const response = await axios.put(url + updatedBlog.id, updatedBlog)
      return response.data
    } catch (error) {
      const errorMessage = error.response.data.error
      return rejectWithValue(errorMessage)
    }
  },
)

export const addComment = createAsyncThunk(
  'blogs/addComment',
  async (updatedBlogComment, { rejectWithValue }) => {
    try {
      console.log(url + updatedBlogComment.id + '/comments')
      const response = await axios.post(url + updatedBlogComment.id + '/comments', updatedBlogComment)
      console.log('response in slice: ', updatedBlogComment, response.data)
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
    resetBlogs: (state) => {
      state.blogsList = []
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
      return {
        ...state,
        blogsList: [...state.blogsList, action.payload],
        success: 'success',
      }
    })
    builder.addCase(createBlog.rejected, (state, action) => {
      return {
        ...state,
        success: '',
        error: action.payload,
      }
    })
    builder.addCase(removeBlog.pending, (state) => {
      return {
        ...state,
        success: 'pending',
      }
    })
    builder.addCase(removeBlog.fulfilled, (state, action) => {
      const { id } = action.meta.arg
      state.blogsList = state.blogsList.filter((blog) => blog.id !== id)
      state.success = 'success'
    })
    builder.addCase(removeBlog.rejected, (state, action) => {
      return {
        ...state,
        success: '',
        error: action.payload,
      }
    })
    builder.addCase(likeBlog.pending, (state) => {
      return {
        ...state,
        success: 'pending',
      }
    })
    builder.addCase(likeBlog.fulfilled, (state, action) => {
      const { id } = action.meta.arg
      state.blogsList = state.blogsList.map((blog) => blog.id === id ? action.payload : blog)
      state.success = 'success'
    })
    builder.addCase(likeBlog.rejected, (state, action) => {
      return {
        ...state,
        success: '',
        error: action.payload,
      }
    })
    builder.addCase(addComment.pending, (state) => {
      return {
        ...state,
        success: 'pending',
      }
    })
    builder.addCase(addComment.fulfilled, (state, action) => {
      const { id } = action.meta.arg
      state.blogsList = state.blogsList.map((blog) => blog.id === id ? action.payload : blog)
      state.success = 'success'
    })
    builder.addCase(addComment.rejected, (state, action) => {
      return {
        ...state,
        success: '',
        error: action.payload,
      }
    })
  },
})

export const { sortByLikes, resetBlogs } = blogSlice.actions
export default blogSlice.reducer
