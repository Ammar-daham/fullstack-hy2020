import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });


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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.creatNewBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      })
      setNewBlog({ title: '', author: '', url: '' });
      setBlogs(blogs.concat(createdBlog))
    } catch (exception) {
      setErrorMessage('wrong format')
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
          <h2>Log in to application</h2>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </p>
          <NewBlog
            handleCreate={handleCreate}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
