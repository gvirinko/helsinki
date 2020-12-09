import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders title and author by default, and not url or likes', () => {
  const blog = {
    title: 'Pizza',
    author: 'Jamie',
    url: 'moo.com',
    likes: 7
  }
  const user = {}
  const component = render(<Blog blog={blog} user={user} />)

  expect(component.container).toHaveTextContent('Pizza')
  expect(component.container).toHaveTextContent('Jamie')
  expect(component.container).not.toHaveTextContent('moo.com')
  expect(component.container).not.toHaveTextContent('7')
  expect(component.container.querySelector('.likesNumber')).toBeNull()
})

test('renders url and likes upon clicking on button View', () => {
  const blog = {
    title: 'Pizza',
    author: 'Jamie',
    url: 'moo.com',
    likes: 7,
    user: { name: 'Joe' }
  }
  const user = { name: 'Joe', username: 'joebiden' }

  const component = render(<Blog blog={blog} user={user} />)
  const button = component.getByText('View')

  fireEvent.click(button)
  expect(component.container).toHaveTextContent('moo.com')
  expect(component.container).toHaveTextContent('7')
})