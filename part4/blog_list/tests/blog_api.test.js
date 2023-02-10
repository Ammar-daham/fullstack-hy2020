const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { use } = require('../app')
const { json } = require('express')



beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('when there is initially some blogs saved', () => {

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, 100000)

    test('there are two blogs', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('the first blog is about learing React js', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].title).toBe('Learning React')
    })

})

describe('unique identifier property is id', () => {
    
    test('unique identifier property of blog post verified', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })

})

describe('addition of new blog', () => {

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
    
      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
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

})

describe('deletion of a blog post', () => {

    test('succeed with status code 204 if id is valid', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToDelete = blogAtStart[0]
        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
        const blogAtEnd = await helper.blogsInDb()
        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        const titles = await blogAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test('fails with status code 400 if id is invalid', async () => {
        const id = '63e27f03c7f62b7aa97b72fc4'
        await api.delete(`/api/blogs/${id}`).expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('updating a specific blog', () => {

    test('succeeds with status 200 if id is valid', async () => {
        const updatedBlog = {
            likes: 5
        }
        const blogAtStart = await helper.blogsInDb()
        const blogToUpdate = blogAtStart[0]
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)
    })

    test('fails with status code 400 if id is invalid', async () => {
        const updatedBlog = {
            likes: 5
        }
        const id = '63e27f03c7f62b7aa97b72fc4'
        await api.put(`/api/blogs/${id}`).send(updatedBlog).expect(400)
    })
})

describe('when there is initially one user in db', () => {
  
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'Adam',
      name: 'Adam daham',
      password: 'Adoom'
    }
    await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(r => r.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Adam daham',
      password: 'Adoom'
    }
    const result =await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    console.log(result.body.error)
    expect(result.body.error).toContain('expected `username` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username length less than 3 chars', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'ro',
      name: 'Adam daham',
      password: 'Adoom'
    }
    const result =await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    console.log(result.body.error)
    expect(result.body.error).toContain('(`' + newUser.username + '`)'  + ' is shorter than the minimum allowed length (3).')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password does not exist', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root root',
      name: 'Adam daham'
    }
    const result =await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('Password required must have at least 3 characters')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  

})

afterAll(async () => {
  await mongoose.connection.close()
})
