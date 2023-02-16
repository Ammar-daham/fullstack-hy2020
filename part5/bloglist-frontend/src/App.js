import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [updateTimestamp, setUpdateTimestamp] = useState(Date.now())

  console.log('blogs: ', blogs)

  console.log('user: ', user)

  useEffect(() => {
    const fetchAll = async () => {
      const data = await blogService.getAll()
      setBlogs(data.sort((a, b) => b.likes - a.likes))
    }
    fetchAll()
  }, [updateTimestamp])

  useEffect(() => {
    const LoggedUserJSON = window.localStorage.getItem('loggedUser')
    if (LoggedUserJSON) {
      const user = JSON.parse(LoggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.createNewBlog(blogObject)
      setUpdateTimestamp(Date.now())
      setSuccessMessage(
        `a new blog ${blogObject.title}! by ${blogObject.author} added`,
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      console.log('createdBlog: ', response)
      setBlogs(blogs.concat(response))
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updatedBlog = async (updatedObject) => {
    try {
      await blogService.updateBlog(updatedObject)
      setBlogs(
        blogs.map((blog) =>
          blog.id === updatedObject.id
            ? { ...blog, likes: updatedObject.likes }
            : blog,
        ),
      )
      console.log('sorted blogs: ', blogs)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const res = await blogService.deleteBlog(blogId)
      setUpdateTimestamp(Date.now())
      console.log('res: ', res)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={handleUsernameChange}
            password={password}
            handlePasswordChange={handlePasswordChange}
          />
        </div>
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification
            errorMessage={errorMessage}
            successMessage={successMessage}
          />

          <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="create new blog">
            <NewBlogForm createBlog={addBlog} />
          </Togglable>

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
