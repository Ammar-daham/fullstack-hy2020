import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import '../index.css'

const Blogs = ({ blog }) => {
  if (!blog) {
    return null
  }
  return (
    <Col xs={12} md={3}>
      <Card className="card" style={{ width: '18rem' }} key={blog.id}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{blog.Title}</Card.Title>
          <Card.Text>{blog.author}</Card.Text>
          <button>
            <Link className="link" to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Blogs
