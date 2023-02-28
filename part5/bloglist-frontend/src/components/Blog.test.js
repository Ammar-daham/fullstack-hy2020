import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

describe('Blog', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'http://www.testblog.com',
    likes: 10,
    user: { name: 'Test user' },
  }

  const updatedBlog = jest.fn()
  const user = userEvent.setup()

  test('renders title and author', () => {
    render(<Blog blog={blog} />)
    const title = screen.getByText(/Test.*blog/)
    const author = screen.getByText(/Test.*author/)
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })

  test('shows blog URL and likes when button is clicked', async () => {
    // before clicking the view button
    expect(screen.queryByText(/likes\s+\d+/i)).toBeNull()
    expect(screen.queryByText(blog.url)).toBeNull()

    render(<Blog blog={blog} />)
    const button = screen.getByText('view')

    await user.click(button)

    // after clicking the view button
    expect(screen.getByText(blog.url)).toBeVisible()
    expect(screen.getByText(/likes\s+\d+/)).toBeVisible()
  })

  test('clicking like button twice calls event handler twice', async () => {
    render(<Blog blog={blog} updatedBlog={updatedBlog} />)
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(updatedBlog.mock.calls).toHaveLength(2)
  })
})

describe('new blog', () => {
  test('new blog created with the right details', async () => {
    const createBlog = jest.fn()
    render(<NewBlogForm createBlog={createBlog} />)

    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')
    //const form = screen.getByRole('form')

    await userEvent.type(titleInput, 'Test Title')
    await userEvent.type(authorInput, 'Test Author')
    await userEvent.type(urlInput, 'http://testurl.com')
    await userEvent.click(screen.getByText('create'))

    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://testurl.com',
    })
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('http://testurl.com')
  })
})
