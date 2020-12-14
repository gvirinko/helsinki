import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()
  const component = render(<BlogForm createBlog={addBlog} />)
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { target: { value: 'Spaghetti' } })
  fireEvent.change(authorInput, { target: { value: 'Jamie' } })
  fireEvent.change(urlInput, { target: { value: 'moo.com' } })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Spaghetti')
  expect(addBlog.mock.calls[0][0].author).toBe('Jamie')
  expect(addBlog.mock.calls[0][0].url).toBe('moo.com')
})
