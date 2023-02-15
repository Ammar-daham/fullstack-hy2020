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
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  console.log('user: ', user)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.creatNewBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      })
      setSuccessMessage(`a new blog ${newBlog.title}! by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setNewBlog({ title: '', author: '', url: '' })
      setBlogs(blogs.concat(createdBlog))
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
         
          <Togglable buttonLabel='create new blog'>
            <NewBlogForm
              handleCreate={handleCreate}
              newBlog={newBlog}
              setNewBlog={setNewBlog}
            />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
