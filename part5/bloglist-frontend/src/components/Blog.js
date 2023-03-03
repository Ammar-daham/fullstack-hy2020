import { useParams } from 'react-router-dom'

const Blog = ({ blogs, updatedBlog, deleteBlog, user }) => {
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
    window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)
      ? deleteBlog(blog)
      : console.log('not deleted')
  }
  if (!blog || !user) {
    return null
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
        {/* {blog.comments !== null
          ? console.log('exist')
          : console.log('not exist')} */}
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
