const Blog = require('../models/blog')
const User = require('../models/user')

// const initialBlogs = [
//     {
//       title: 'Learning React',
//       author: 'Ammar Daham',
//       url: 'http://ammardaham.com',
//       likes: 2,
//       user: "63e978d1536af486fa4c1bff"
//     },
//     {
//       title: 'Learning Redux',
//       author: 'Ammar Daham',
//       url: 'http://ammardaham.com',
//       likes: 4,
//       user: "63e978d1536af486fa4c1bff"
//     },
// ]


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
  }


const initialUser = 
  {
    username: 'testuser',
    password: 'testpassword',
  }


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    blogsInDb,
    //initialBlogs,
    usersInDb, 
    initialUser
}