import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setSuccess, setError } from './redux/slices/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  allBlogs,
  sortByLikes,
  createBlog,
  removeBlog,
  likeBlog,
  addComment,
} from './redux/slices/blogSlice'
import { setToken } from './redux/slices/blogSlice'
import { allUsers, login, createUser } from './redux/slices/userSlice'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Container from 'react-bootstrap/Container'
import BlogsTabs from './components/BlogsTabs'
import SignupForm from './components/SignupForm'


const App = () => {
  const [updateTimestamp, setUpdateTimestamp] = useState(Date.now())

  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const users = state.users.usersList
  const notification = state.notifications
  const blogs = state.blogs.blogsList
  const user = state.users.user

  useEffect(() => {
    dispatch(allBlogs())
  }, [updateTimestamp])

  console.log('users: ', users)

  console.log('blogs: ', blogs)

  console.log('user: ', user)

  useEffect(() => {
    dispatch(sortByLikes())
  }, [blogs])

  const handleLogin = async (obj) => {
    const user = await dispatch(login(obj))
    window.localStorage.setItem('loggedUser', JSON.stringify(user.payload))
    setToken(user.payload.token)
    dispatch(allBlogs())
    dispatch(allUsers())
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
    await dispatch(removeBlog(blog))
  }

  const addComments = async (updatedBlogComments) => {
    await dispatch(addComment(updatedBlogComments))
    setUpdateTimestamp(Date.now())
  }

  const createNewUser = async (newUser) => {
    const res = await dispatch(createUser(newUser))
    console.log('new user: ', res)
    if (res.type === 'user/login/rejected') {
      dispatch(setError(user.payload, 10))
    } else {
      dispatch(setSuccess(`Thank you ${res.payload.name}, welcome to our blog post app!`, 10))
    }
  }

  return (
    <Router>
      <div>
        <Navbar user={user} />

        <Notification
          errorMessage={notification.error}
          successMessage={notification.success}
        />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-up" element={<SignupForm createUser={createNewUser}/>}></Route>
          <Route
            path="/login"
            element={<LoginForm handleLogin={handleLogin} />}
          ></Route>
          <Route path="/users" element={<Users users={users} />}></Route>
          <Route path="/users/:id" element={<User users={users} />}></Route>
          {/* <Route
            path="/blogs/create-new-blog"
            element={
              <VisibilityToggler
                buttonLabel="create new blog"
                cancelButtonLabel="cancel"
              >
                <NewBlogForm createBlog={addBlog} />
              </VisibilityToggler>
            }
          ></Route> */}
          <Route
            path="/blogs"
            element={
              <Container>
                <BlogsTabs blogs={blogs} createBlog={addBlog} />
              </Container>
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
                addComment={addComments}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
