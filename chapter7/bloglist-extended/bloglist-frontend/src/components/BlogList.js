import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { loggingOut } from '../reducers/loginReducer'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(loggingOut())
  }

  return (
    <div>
      <h4>{user.name} logged in.</h4>
      <button type="submit" onClick={handleLogout}>Logout</button>
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