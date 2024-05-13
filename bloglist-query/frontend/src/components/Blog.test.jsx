import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import Blog from './Blog'

test('content before clicking view button', () => {
    const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://localhost.com',
        likes: 100,
        user: {
            id: 'kkkk'
        }
    }
    const user = {
        id: 'kkkk'
    }

    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.whenHidden')

    expect(div).toHaveTextContent(
        'First class tests Robert C. Martin'
    )
})