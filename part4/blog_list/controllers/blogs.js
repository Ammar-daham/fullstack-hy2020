const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')





blogRouter.get('/',  async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.status(200).json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() === user.id.toString()) {
    await blog.remove()
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' },
  )
  response.json(updatedBlog)
})

module.exports = blogRouter
