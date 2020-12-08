import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const [updBlog, setUpdBlog] = useState(blog)

  useEffect(() => {
    setUpdBlog(blog)
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async (event) => {
    event.preventDefault()
    const blogObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      userId: blog.user.id,
      likes: updBlog.likes + 1
    }
    const updatedBlog = await blogService.changeBlog(blogObject)
    setUpdBlog(updatedBlog)
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    await blogService.deleteBlog(blog.id)
    setUpdBlog(null)
  }

  return (
    updBlog && (
      <div style={blogStyle}>
        {updBlog.title} - {updBlog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'View'}</button>
        {visible &&
          <div>
            <p>{updBlog.url}</p>
            <p>Likes: <span className='likesNumber'>{updBlog.likes}</span><button onClick={addLike}>Like</button></p>
            <p>{blog.user.name}</p>
            <button onClick={deleteBlog}
              style={{ display: blog.user.username === user.username ? '' : 'none' }}
            >Delete</button>
          </div>
        }
      </div >
    )
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
