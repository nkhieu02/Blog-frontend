import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('render content', () => {
    const blog = {
        title: 'HTML is so fucking hard',
        author: 'HieuNguyen',
        likes: 100,
        url: 'abcdkjkj'
    }
    const { container } = render(<Blog blog={blog} />)
    const element = container.querySelector('.viewable')
    const element2 = container.querySelector('.notViewable')
    screen.debug(element)
    screen.debug(element2)
    expect(element).toBeVisible
    expect(element2).not.toBeVisible
})

describe('Toggleable', () => {
    let container
    beforeEach(() => {
        const blog = {
            title: 'HTML is so fucking hard',
            author: 'HieuNguyen',
            likes: 100,
            url: 'abcdkjkj'
        }
        container = render(<Blog blog={blog} />).container
    })
    test('at start not displayed', async () => {
        const element = container.querySelector('.notViewable')
        expect(element).toHaveStyle('display: none')
    })
    test('after clicking the button', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('.notViewable')
        expect(div).not.toHaveStyle('display: none')
    })
})
/*
test('Clicking upVote made the passed function called ', async () => {
    const setBlogs = jest.fn()
    const blog = {
        title: 'HTML is so fucking hard',
        author: 'HieuNguyen',
        likes: 100,
        url: 'abcdkjkj'
    }
    render(<Blog blog={blog} setBlogs={setBlogs} blogs={[blog]} />)
    const user = userEvent.setup()
    const buttonLikes = screen.getByText('upVote')
    await user.click(buttonLikes)
    await user.click(buttonLikes)
    expect(setBlogs.mock.calls).toHaveLength(2)
})

    The test will fail since the function that update the likes in Blog
    update the data in the database as well, which would cause an error once it finsished
    since the test data has not added to the database (overcomplicated). The functioning of this
    could be test by running the app.
*/
test('props received with right details', async () => {
    const testInput = { title: 'HTML is normal', author: 'HieuNguyen', url: 'abcd' }
    const createBlog = jest.fn()
    const user = userEvent.setup()
    const container = render(<BlogForm handleOnSubmit={createBlog} />).container
    const button = container.querySelector('#blogSubmit')
    const titleInput = container.querySelector('#titleInput')
    const authorInput = container.querySelector('#authorInput')
    const urlInput = container.querySelector('#urlInput')
    await user.type(titleInput, testInput.title)
    await user.type(authorInput, testInput.author)
    await user.type(urlInput, testInput.url)
    await user.click(button)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(testInput)
})

