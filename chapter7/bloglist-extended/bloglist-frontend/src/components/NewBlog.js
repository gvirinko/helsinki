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
  const users = useSelector(state => state.users)

  const populateWithUser = (blog) => {
    const user = users.find(user => user.id === blog.user)
    const userBlock = { id: user.id, name: user.name, username: user.username }
    return { ...blog, user: userBlock }
  }

  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const newBlog = await blogService.create(blogObject)
      // We need to populate it with user data for correct rendering
      // before GET request from database (where 'user' field is populated with user data
      // from a reference table)
      const populatedBlog = populateWithUser(newBlog)
      dispatch(addNewBlog(populatedBlog))
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
