import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import blogService from '../services/blogs'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { initializeComments } from '../reducers/commentReducer'
import Comments from './Comments'


const Blog = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeComments())
  }, [])

  if (!blog || ! user) {
    return null
  }

  const addLike = async (event) => {
    event.preventDefault()
    const blogObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      userId: blog.user.id,
      likes: blog.likes + 1
    }
    await blogService.changeBlog(blogObject)
    dispatch(updateBlog(blogObject))
  }

  const handleDeleteBlog = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    await blogService.deleteBlog(blog.id)
    dispatch(deleteBlog(blog))
  }

  return (
    <div style={{ 'margin-top': '30px' }}>
      <Card style={{ width: '300px' }}>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle>by {blog.author}</Card.Subtitle>
          <p>{blog.url}</p>
          <p><span className='likesNumber'>{blog.likes} like(s) </span>
            <button className='like-button' onClick={addLike}>Like</button>
          </p>
          <p>Added by: {blog.user.name}
          </p>
          <Button variant='danger' onClick={handleDeleteBlog}
            style={{ display: user.username === blog.user.username ? '' : 'none' }}
          >Delete</Button>
        </Card.Body>
      </Card>
      <Comments blogId={blog.id} />
    </div>
  )
}

export default Blog