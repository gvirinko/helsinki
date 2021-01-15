import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import Blog from './Blog'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  // const user = useSelector(state => state.login)

  return (
    <div>
      <h2>Blogs:</h2>
      {
        blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
            {/* <Blog blog={blog} user={user} /> */}
          </div>
        )
      }
    </div>
  )
}

export default BlogList