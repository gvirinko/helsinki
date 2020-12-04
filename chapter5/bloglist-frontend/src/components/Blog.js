import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const [updBlog, setUpdBlog] = useState(blog)

  useEffect(() => {
    setUpdBlog(blog)
  }, [blog])

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
      userId: user._id,
      likes: updBlog.likes + 1
    }
    const updatedBlog = await blogService.changeBlog(blogObject)
    setUpdBlog(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'View'}</button>
      {visible &&
        <div>
          <p>{blog.url}</p>
          <p>Likes: <span>{updBlog.likes}</span><button onClick={addLike}>Like</button></p>
          <p>{user.name}</p>
        </div>
      }
    </div>
  )
}


export default Blog
