import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test('renders title and author', () => {
    const blog = {
        title: 'Learn Jest',
        author: 'Max',
        user: {
            name: ''
        }
    }


    render(<Blog blog={blog} />)
    
    const title = screen.getByText(/Learn.*Jest/)
    const author = screen.getByText(/max/i)
    expect(title).toBeDefined()
    expect(author).toBeDefined()
})