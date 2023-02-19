import { useState } from "react"

const NewBlog = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      
    })
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new blog post</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            data-testid="title-input"
            id="title-input"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            data-testid="author-input"
            id="author-input"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            name="URL"
            data-testid="url-input"
            id="url-input"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type="submit" id='create-button'>create</button>
      </form>
    </div>
  )
}

export default NewBlog
