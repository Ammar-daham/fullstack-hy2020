import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import { useNavigate } from 'react-router-dom'


const Blog = ({ blogs, updatedBlog, deleteBlog, user, addComment }) => {
  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  const handleUpdateLikes = () => {
    const updatedBlogLikes = {
      ...blog,
      likes: blog.likes + 1,
    }
    updatedBlog(updatedBlogLikes)
  }

  const handleDelete = () => {
    if(window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)) {
      deleteBlog(blog)
      navigate('/blogs')
    }
  }
  if (!blog || !user) {
    return null
  }

  const handleAddComment = (comment) => {
    const updatedBlogComments = {
      id: blog.id,
      comment
    }
    console.log('commented blog: ', updatedBlogComments)
    addComment(updatedBlogComments)
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href="got to link">{blog.url}</a>
      <br />
      {blog.likes} likes <button onClick={handleUpdateLikes}>Like</button>
      <br />
      added by {blog.user.name}
      <br />
      {blog.user.name === user.name && (
        <button onClick={handleDelete}>remove</button>
      )}
      <br />
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <CommentForm addComment={handleAddComment} />
    </div>
  )
}

export default Blog
