import { useParams } from 'react-router-dom'

const Blog = ({ blogs, updatedBlog, deleteBlog, name }) => {
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

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href="got to link">{blog.url}</a>
      <br />
      {blog.likes} likes <button onClick={handleUpdateLikes}>Like</button>
      <br />
      added by {blog.user.name}
      <br />
      {blog.user.name === name && (
        <button onClick={handleDelete}>remove</button>
      )}
    </div>
  )
}

export default Blog
