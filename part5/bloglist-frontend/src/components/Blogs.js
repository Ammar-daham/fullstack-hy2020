import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import '../index.css'

const Blogs = ({ blogs }) => {
  if (!blogs) {
    return null
  }
  return (
    <Row>
      {blogs.map((blog) => {
        return (
          <Col xs={12} key={blog.id}>
            <Card className="item">
              <Link className="item_link" to={`/blogs/${blog.id}`}>
                <div className="item_bg"></div>
                <Card.Title className="item_title">{blog.title.toUpperCase()}</Card.Title>
                <Card.Text className="item-text">By {blog.author}</Card.Text>
                <Card.Text className="item-text">
                  <a className="link" href={blog.url}>
                    Read more
                  </a>
                </Card.Text>
              </Link>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default Blogs
