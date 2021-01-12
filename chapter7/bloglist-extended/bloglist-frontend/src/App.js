import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
// import BlogForm from './components/BlogForm'
// import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
// import { notificationSet } from './reducers/notificationReducer'
// import { initializeBlogs } from './reducers/blogReducer'
import { loggingOut } from './reducers/loginReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(initializeBlogs())
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(loggingOut())
  }

  // const addBlog = async (blogObject) => {
  //   try {
  //     blogService.setToken(user.token)
  //     const newBlog = await blogService.create(blogObject)
  //     setBlogs([...blogs, newBlog])
  //     dispatchNotification('A new blog has been added.')
  //     removeNotification(5)
  //   }
  //   catch (exception) {
  //     dispatchNotification('The blog cannot be added.', error)
  //     removeNotification(5)
  //   }
  // }

  // const blogForm = () => {
  //   return (
  //     <Togglable buttonLabel='New Blog'>
  //       <BlogForm createBlog={addBlog}
  //       />
  //     </Togglable>
  //   )
  // }
  const blogsList = () => (
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

  return (
    <div>
      <Notification notification={notification} />
      {user === null && <LoginForm />}
      { user !== null && blogsList()}
      {/* { user !== null && blogForm()} */}
    </div>
  )
}

export default App