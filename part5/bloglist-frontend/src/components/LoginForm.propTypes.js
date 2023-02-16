import propTypes from 'prop-types'
import LoginForm from './LoginForm'


LoginForm.propTypes = {
    handleLogin: propTypes.func.isRequired,
    handleUsernameChange: propTypes.func.isRequired,
    handlePasswordChange: propTypes.func.isRequired,
    username: propTypes.func.isRequired,
    password: propTypes.func.isRequired
}