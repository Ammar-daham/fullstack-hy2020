import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'
import '../index.css'

const SignupForm = ({ createUser }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handleNameChange = ({ target }) => {
    setName(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await createUser({ name, username, password })
      setUsername('')
      setPassword('')
      console.log('res ', res)
      if (res === 'user/login/rejected') {
        navigate('/sign-up')
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.log('error ', error)
    }
  }

  return (
    <Container className="login-container">
      <Form className="login-form" onSubmit={onSubmit}>
        <h2>Sign Up</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            name="name"
            onChange={handleNameChange}
          />
        </Form.Group>
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
        <Row>
          <Col xs={8} sm={8}></Col>
          <Col xs={4} sm={4}>
            <button id="login-button" type="submit">
              Sign up
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default SignupForm
