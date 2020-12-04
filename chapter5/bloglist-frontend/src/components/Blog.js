import React, { useState } from 'react'
const Blog = ({ blog, userName }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'View'}</button>
      {visible &&
        <div>
          <p>{blog.url}</p>
          <p>Likes: <span>0</span><button>Like</button></p>
          <p>{userName}</p>
        </div>
      }
    </div>
  )
}


export default Blog
