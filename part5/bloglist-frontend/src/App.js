import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
import { fetchAll, login, resetUser, setUser } from './redux/slices/userSlice'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await dispatch(
      login({
        username,
        password,
      }),
    )
    window.localStorage.setItem('loggedUser', JSON.stringify(user.payload))
    setToken(user.payload.token)
    setUsername('')
    setPassword('')
    if (user.type === 'user/login/rejected') {
      dispatch(setError(user.payload, 10))
    }
  }

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(resetUser())
  }

  return (
    <div>
      {user === null && (
        <div>
          <h2>log in to application</h2>
          <Notification
            errorMessage={notification.error}
            successMessage={notification.success}
          />
          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            username={username}
            password={password}
          />
        </div>
      )}
      {user && (
        <Router>
          <div>
            <div>
              <Link to="/blogs">Blogs</Link>
              <Link to="/users">Users</Link>
            </div>
            <p>
              {user.name} logged in
              <button id="logout-button" onClick={handleLogout}>
                logout
              </button>
            </p>

            <Routes>
              <Route path='/users' element={<Users users={users}/>}></Route>
            </Routes>
            <h2>blogs</h2>
            <Notification
              errorMessage={notification.error}
              successMessage={notification.success}
            />


            <VisibilityToggler
              buttonLabel="create new blog"
              cancelButtonLabel="cancel"
            >
              <NewBlogForm createBlog={addBlog} />
            </VisibilityToggler>

            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updatedBlog={updatedBlog}
                deleteBlog={deleteBlog}
                name={user.name}
              />
            ))}
          </div>
        </Router>
      )}
    </div>
  )
}

export default App
