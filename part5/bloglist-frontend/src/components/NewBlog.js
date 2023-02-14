
const NewBlog = ({handleCreate, newBlog, setNewBlog}) => (
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newBlog.url}
          name="URL"
          onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
        />
      </div>
      <button type="submit">create</button>
    </form>
)

export default NewBlog