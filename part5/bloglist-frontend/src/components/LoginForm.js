import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import '../index.css'

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await handleLogin({ username, password })
      setUsername('')
      setPassword('')
      console.log('res ', res)
      if (res === 'user/login/rejected') {
        navigate('/login')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.log('error ', error)
    }
  }

  return (
    <Container className="login-container">
      <Form onSubmit={onSubmit} className="login-form">
        <h2>Login to the blog post App</h2>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <button id="login-button" type="submit">
          login
        </button>
      </Form>
    </Container>
  )
}

export default LoginForm
