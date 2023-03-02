import '../index.css'
//import VisibilityToggler from './VisibilityToggler'
import { Link } from 'react-router-dom'

const Blogs = ({ blog }) => {
  // const handleUpdateLikes = () => {
  //   const updatedBlogLikes = {
  //     ...blog,
  //     likes: blog.likes + 1,
  //   }
  //   updatedBlog(updatedBlogLikes)
  // }

  // const handleDelete = () => {
  //   window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)
  //     ? deleteBlog(blog)
  //     : console.log('not deleted')
  // }
  if (!blog) {
    return null
  }
  return (
    <div>
      <div className="blogStyle" key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        {/* <VisibilityToggler buttonLabel="view" cancelButtonLabel="hide">
          <a href="go to link">{blog.url}</a>
          <br />
          likes {blog.likes}{' '}
          <button id="likes-button" onClick={handleUpdateLikes}>
            like
          </button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.name === name && (
            <button onClick={handleDelete}>remove</button>
          )}
        </VisibilityToggler> */}
      </div>
    </div>
  )
}

export default Blogs
