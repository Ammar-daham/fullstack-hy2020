//import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../index.css'

const SignupForm = () => {
  //   const [name, setName] = useState('')
  //   const [username, setUsername] = useState('')
  //   const [password, setPassword] = useState('')

  //   setName('ammar')
  //   setUsername('ammar')
  //   setPassword('dasdas')

  return (
    <Container className="login-container">
      <Form className="login-form">
        <h2>Sign Up</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            // value={name}
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            // value={username}
            name="Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            // value={password}
            name="Password"
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
