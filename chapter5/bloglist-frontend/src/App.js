import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ text: null, type: null })

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('LoggedBloglistAppUser', JSON.stringify(user))
      setUser(user)
      setMessage({ text: 'Logged in successfully' })
      setTimeout(() => {
        setMessage({ text: null, type: null })
      }, 5000)
    }
    catch (exception) {
      setMessage({ text: 'Wrong username or password.', type: "error" })
      setTimeout(() => {
        setMessage({ text: null, type: null })
      }, 5000)
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
      setMessage({ text: `A new blog has been added.` })
      setTimeout(() => {
        setMessage({ text: null, type: null })
      }, 5000)
    }
    catch (exception) {
      setMessage({ text: 'The blog cannot be added.', type: 'error' })
      setTimeout(() => {
        setMessage({ text: null, type: null })
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2> Please log in to application:</h2>
      <div>
        username
           <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
            <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
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
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>
  )

  return (
    <div>
      <Notification message={message} />
      {user === null && loginForm()}
      { user !== null && blogsList()}
      { user !== null && blogForm()}

    </div>
  )
}

export default App