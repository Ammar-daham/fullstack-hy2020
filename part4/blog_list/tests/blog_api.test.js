const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Learning React",
        author: "Ammar Daham",
        url: "http://ammardaham.com",
        likes: 2
    },
    {
        title: "Learning Redux",
        author: "Ammar Daham",
        url: "http://ammardaham.com",
        likes: 4
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
},100000)

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is about learing React js', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body[0].title).toBe('Learning React')
})

afterAll(async () => {
    await mongoose.connection.close()
})