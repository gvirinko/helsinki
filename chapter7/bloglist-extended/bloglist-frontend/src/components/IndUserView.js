import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


const IndUserView = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const indUser = users.find(user => user.id === id)
  if (!indUser) {
    return null
  }
  return (
    <div>
      <h5>{indUser.name} added the following blog(s):</h5>
      {indUser.blogs.map(blog =>
        <li key={blog.id}>{blog.title} by {blog.author}
        </li>)
      }
    </div>
  )
}

export default IndUserView