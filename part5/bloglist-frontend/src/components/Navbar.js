import { Navbar, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetUser } from '../redux/slices/userSlice'
import { resetBlogs } from '../redux/slices/blogSlice'
import '../index.css'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(resetUser())
    dispatch(resetBlogs())
    navigate('/login')
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="mb-3"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {user === null ? (
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link to="/" className="link">
                HOME
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/login" className="link">
                LOGIN
              </Link>
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link to="/" className="link">
                HOME
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users" className="link">
                USERS
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/blogs" className="link">
                BLOGS
              </Link>
            </Nav.Link>
            <p className="loggedIn">
              {user.name} logged in
              <button id="logout-button" onClick={handleLogout}>
                logout
              </button>
            </p>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
