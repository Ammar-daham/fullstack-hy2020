import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  test('renders title and author', () => {
    const blog = {
      title: 'Learn Jest',
      author: 'Max',
      url: 'http://example.com',
      likes: 0,
      user: {
        name: '',
      },
    }

    render(<Blog blog={blog} />)
    const title = screen.getByText(/Learn.*Jest/)
    const author = screen.getByText(/max/i)
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })

  test('shows blog URL and likes when button is clicked', async () => {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'http://www.testblog.com',
      likes: 10,
      user: { name: 'Test user' },
    }

    // before clicking the view button
    expect(screen.queryByText(/likes\s+\d+/i)).toBeNull();
    expect(screen.queryByText(blog.url)).toBeNull()
    
    render(<Blog blog={blog} />)
    const button = screen.getByText('view')
    
    const user = userEvent.setup()
    await user.click(button)
    
    // after clicking the view button
    expect(screen.getByText(blog.url)).toBeVisible()
    expect(screen.getByText(/likes\s+\d+/i)).toBeVisible()
  })
})
