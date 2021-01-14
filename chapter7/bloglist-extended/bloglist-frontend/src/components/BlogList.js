import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  return (
    <div>
      <h2>Blogs:</h2>
      {
        blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id}>
            <Blog blog={blog} user={user} />
          </div>
        )
      }
    </div>
  )
}

export default BlogList