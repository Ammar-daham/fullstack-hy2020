import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import VisibilityToggler from './components/VisibilityToggler'
import { setSuccess, setError } from './redux/slices/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  allBlogs,
  sortByLikes,
  createBlog,
  removeBlog,
  likeBlog,
} from './redux/slices/blogSlice'
import { setToken } from './redux/slices/blogSlice'
import { fetchAll, login, setUser } from './redux/slices/userSlice'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Container } from 'react-bootstrap'

const App = () => {
  const [updateTimestamp, setUpdateTimestamp] = useState(Date.now())

  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const users = useSelector((state) => state.users.usersList)

  console.log('users: ', users)

  useEffect(() => {
    dispatch(allBlogs())
    dispatch(fetchAll())
  }, [updateTimestamp])

  const notification = state.notifications
  const blogs = state.blogs.blogsList
  const user = state.users.user

  console.log('blogs: ', blogs)

  console.log('user: ', user)

  useEffect(() => {
    dispatch(sortByLikes())
  }, [blogs])

  useEffect(() => {
    const LoggedUserJSON = window.localStorage.getItem('loggedUser')
    if (LoggedUserJSON) {
      const user = JSON.parse(LoggedUserJSON)
      dispatch(setUser(user))
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (obj) => {
    const user = await dispatch(login(obj))
    window.localStorage.setItem('loggedUser', JSON.stringify(user.payload))
    setToken(user.payload.token)
    if (user.type === 'user/login/rejected') {
      dispatch(setError(user.payload, 10))
    }
    return user.type
  }

  const addBlog = async (blogObject) => {
    const response = await dispatch(createBlog(blogObject))
    setUpdateTimestamp(Date.now())
    if (response.type === 'blogs/newBlog/rejected') {
      dispatch(setError(response.payload, 10))
    } else {
      dispatch(
        setSuccess(
          `a new blog ${blogObject.title}! by ${blogObject.author} added`,
          10,
        ),
      )
    }
  }

  const updatedBlog = async (updatedObject) => {
    await dispatch(likeBlog(updatedObject))
    setUpdateTimestamp(Date.now())
  }

  const deleteBlog = async (blog) => {
    const response = await dispatch(removeBlog(blog))
    console.log('delete: ', response)
  }

  return (
    <Container fluid="md">
      <Router>
        <div>
          <Navbar user={user} />

          <Notification
            errorMessage={notification.error}
            successMessage={notification.success}
          />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/login"
              element={<LoginForm handleLogin={handleLogin} />}
            ></Route>
            <Route path="/users" element={<Users users={users} />}></Route>
            <Route path="/users/:id" element={<User users={users} />}></Route>
            <Route path="/"></Route>
            <Route
              path="/blogs"
              element={
                <div>
                  <h2>blogs</h2>

                  <VisibilityToggler
                    buttonLabel="create new blog"
                    cancelButtonLabel="cancel"
                  >
                    <NewBlogForm createBlog={addBlog} />
                  </VisibilityToggler>
                  {blogs.map((blog) => (
                    <Blogs key={blog.id} blog={blog} />
                  ))}
                </div>
              }
            ></Route>
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blogs={blogs}
                  updatedBlog={updatedBlog}
                  deleteBlog={deleteBlog}
                  user={user}
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </Container>
  )
}

export default App
