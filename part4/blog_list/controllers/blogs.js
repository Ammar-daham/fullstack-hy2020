const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
   const blog = await Blog.find({})
   response.status(200).json(blog)
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  } catch(exception) {
      next(exception)
  }
})

module.exports = blogRouter
