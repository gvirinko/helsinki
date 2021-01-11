import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { notificationSet } from './reducers/notificationReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const notification = useSelector(state => state.notification)
  const error = 'error'
  // console.log('notification')

  // console.log(notification)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const dispatchNotification = (text, error) => {
    if (error) {
      dispatch(notificationSet(text, true))
    } else {
      dispatch(notificationSet(text, false))
    }
  }

  const removeNotification = (delay) => {
    setTimeout(() => {
      dispatchNotification('')
    }, delay * 1000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('LoggedBloglistAppUser', JSON.stringify(user))
      setUser(user)
      dispatchNotification('Logged in successfully')
      removeNotification(5)
    }
    catch (exception) {
      dispatchNotification('Wrong username or password.', error)
      removeNotification(5)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('LoggedBloglistAppUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const newBlog = await blogService.create(blogObject)
      setBlogs([...blogs, newBlog])
      dispatchNotification('A new blog has been added.')
      removeNotification(5)
    }
    catch (exception) {
      dispatchNotification('The blog cannot be added.', error)
      removeNotification(5)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2> Please log in to application:</h2>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className='login-button' type="submit">login</button>
    </form>)

  const blogForm = () => {
    return (
      <Togglable buttonLabel='New Blog'>
        <BlogForm createBlog={addBlog}
        />
      </Togglable>
    )
  }
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
      {user === null && loginForm()}
      { user !== null && blogsList()}
      { user !== null && blogForm()}
    </div>
  )
}

export default App