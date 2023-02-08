const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is about learing React js', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('Learning React')
})

test('unique identifier property of blog post verified', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Learning Jest test',
    author: 'Ammar Daham',
    url: 'http://ammardaham.com',
    likes: 3,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('Learning Jest test')
})

test('likes property sets to 0 by default', async () => {
  const newBlog = {
    title: 'Learning express js',
    author: 'Ammar Daham',
    url: 'http://ammardaham.com',
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Ammar Daham',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})
