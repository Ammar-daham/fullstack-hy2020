import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../index.css'

const Users = ({ users }) => {
  return (
    <Container>
      <h2>Users</h2>
      <Row>
        {users.map((user) => {
          return (
            <Col xs={12} md={3} key={user.id}>
              <Card className='card' style={{ width: '15rem' }}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text style={{ color: 'black' }}>
                    User Name: {user.name}
                  </Card.Text>
                  <Card.Text style={{ color: 'black' }}>
                    Blogs Created: {user.blogs.length}
                  </Card.Text>
                  <button>
                    <Link className="link" to={`/users/${user.id}`}>
                      User
                    </Link>
                  </button>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default Users
