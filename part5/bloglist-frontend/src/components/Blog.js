import { useState } from 'react'
import '../index.css'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'} 

  const toggleVisibility = () => {
    setVisible(!visible)
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
        likes {blog.likes} <button>like</button>
        <br/>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
