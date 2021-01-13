import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from '../services/blogs'
import { addNewBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { notificationSet } from '../reducers/notificationReducer'


const NewBlog = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const newBlog = await blogService.create(blogObject)
      dispatch(addNewBlog(newBlog))
      dispatch(notificationSet('A new blog has been added.', false, 5))
    }
    catch (exception) {
      dispatch(notificationSet('The blog cannot be added.', true, 5))
    }
  }

  return (
    <Togglable buttonLabel='New Blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
}

export default NewBlog
