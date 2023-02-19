import '../index.css'
import VisibilityToggler from './VisibilityToggler'

const Blog = ({ blog, updatedBlog, deleteBlog, name }) => {
  
  const handleUpdateLikes = () => {
    const updatedBlogLikes = {
      ...blog,
      likes: blog.likes + 1
    };
    updatedBlog(updatedBlogLikes)
  }

  const handleDelete = () => {
    window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)
      ? deleteBlog(blog.id)
      : console.log('not deleted')
  }

  return (
    <div className="blogStyle">
      {blog.title} {blog.author}
      <VisibilityToggler buttonLabel="view" cancelButtonLabel="hide">
          <a href="go to link">{blog.url}</a>
          <br />
          likes {blog.likes} <button id='likes-button' onClick={handleUpdateLikes}>like</button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.name === name && (
            <button onClick={handleDelete}>remove</button>
          )}
      </VisibilityToggler>
    </div>
  )
}

export default Blog
