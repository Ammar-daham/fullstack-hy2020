import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import VisibilityToggler from './components/VisibilityToggler'
import { setSuccess, setError } from './redux/slices/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { allBlogs, sortByLikes, createBlog } from './redux/slices/blogSlice'
import { setToken } from './redux/slices/blogSlice'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [updateTimestamp, setUpdateTimestamp] = useState(Date.now())

  const dispatch = useDispatch()

  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(allBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs.blogsList)
  console.log('blogs: ', blogs)

  useEffect(() => {
    //const data = await blogService.getAll()
    //const data = dispatch(allBlogs())
    //console.log('data: ', data)
    //setBlogs(state.sort((a, b) => b.likes - a.likes))
    dispatch(sortByLikes())
  }, [updateTimestamp])

  useEffect(() => {
    const LoggedUserJSON = window.localStorage.getItem('loggedUser')
    if (LoggedUserJSON) {
      const user = JSON.parse(LoggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setError(exception.response.data.error, 10))
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
    console.log('response: ', response)
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
    try {
      await blogService.updateBlog(updatedObject)
      // setBlogs(
      //   blogs.map((blog) =>
      //     blog.id === updatedObject.id
      //       ? { ...blog, likes: updatedObject.likes }
      //       : blog,
      //   ),
      // )
      console.log('sorted blogs: ', blogs)
    } catch (exception) {
      dispatch(setError(exception.response.data.error, 10))
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const res = await blogService.deleteBlog(blogId)
      setUpdateTimestamp(Date.now())
      console.log('res: ', res)
    } catch (exception) {
      dispatch(setError(exception.response.data.error, 10))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    console.log('logged out')
  }

  return (
    <div>
      {!user && (
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
        <div>
          <h2>blogs</h2>
          <Notification
            errorMessage={notification.error}
            successMessage={notification.success}
          />

          <p>
            {user.name} logged in
            <button id="logout-button" onClick={handleLogout}>
              logout
            </button>
          </p>

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
      )}
    </div>
  )
}

export default App
