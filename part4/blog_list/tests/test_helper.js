const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'Learning React',
      author: 'Ammar Daham',
      url: 'http://ammardaham.com',
      likes: 2,
    },
    {
      title: 'Learning Redux',
      author: 'Ammar Daham',
      url: 'http://ammardaham.com',
      likes: 4,
    },
]


const nonExistingId = async () => {
    const blog = new Blog({
        title: 'Learn Java',
        author: 'Ammar Daham',
        url: 'http://ammardaha.com'
    })

    await blog.save()
    await blog.remove()
    return person._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
  }

module.exports = {
    blogsInDb,
    nonExistingId,
    initialBlogs
}