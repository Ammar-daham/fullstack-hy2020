import { useState } from 'react'
import blogService from '../services/blogs'
import '../index.css'

const Blog = ({ blog, updatedBlog, deleteBlog, name }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'} 

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleUpdateLikes = () => {
    blog.likes++
    updatedBlog(blog)
  }

  const handleDelete = () => {
    window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`) 
    ? deleteBlog(blog.id)
    : console.log('not deleted')
    
  }
  
  return (
    <div className="blogStyle">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}        
        <button onClick={toggleVisibility}>hide</button>
        <br/>
        <a href='go to link'>{blog.url}</a>
        <br/>
        likes {blog.likes} <button onClick={handleUpdateLikes}>like</button>
        <br/>
        {blog.user.name}
        <br />
        {
          blog.user.name === name &&
          <button onClick={handleDelete}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog
