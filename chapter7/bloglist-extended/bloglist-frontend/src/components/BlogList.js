import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>Blogs:</h2>
      <ListGroup variant='flush'>
        {
          blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <ListGroup.Item variant='light' key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
            </ListGroup.Item>
          )
        }
      </ListGroup>
    </div>
  )
}

export default BlogList