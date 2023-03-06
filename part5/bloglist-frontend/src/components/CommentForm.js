import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useState } from 'react'
import '../index.css'


const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState()

  console.log('comment: ', comment)

  const handleSubmit = (event) => {
    event.preventDefault()
    addComment(comment)
    setComment('')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          value={comment}
          onChange={handleCommentChange}
        />
      </FloatingLabel>
      <br />
      <button type="submit">Add Comment</button>
    </Form>
  )
}

export default CommentForm
