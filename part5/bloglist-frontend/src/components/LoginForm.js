import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      if(res === 'user/login/rejected') {
        navigate('/login')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.log('error ', error)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
