import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'


const IndUserView = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const indUser = users.find(user => user.id === id)
  if (!indUser) {
    return null
  }
  return (
    <div>
      <h5 style={{ 'margin': '30px 0 30px 0' }}>{indUser.name} added the following blog(s):</h5>
      <ListGroup>
        {indUser.blogs.map(blog =>
          <ListGroup.Item variant='flush' key={blog.id}>{blog.title} by {blog.author}
          </ListGroup.Item>)
        }
      </ListGroup>
    </div>
  )
}

export default IndUserView