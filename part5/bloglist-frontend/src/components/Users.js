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
            <Col xs={12} sm={4} key={user.id}>
              <Card className='card'>
                <Card.Body>
                  <Card.Title className='card-text'>
                    {user.name.toUpperCase()}
                  </Card.Title>
                  <Card.Text className='card-text'>
                    Blogs Created: {user.blogs.length}
                  </Card.Text>
                  <button>
                    <Link className="button-link" to={`/users/${user.id}`}>
                      More info
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
