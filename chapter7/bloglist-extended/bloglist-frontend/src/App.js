import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import UsersView from './components/UsersView'
import IndUserView from './components/IndUserView'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loggingOut } from './reducers/loginReducer'


const App = () => {
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(loggingOut())
  }

  const padding = {
    padding: 10
  }

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())

  }, [])

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
      <Notification notification={notification} />
      {user === null && <LoginForm />}
      {user !== null &&
        (<div>
          <h4>{user.name} logged in.</h4>
          <button type="submit" onClick={handleLogout}>Logout</button>
        </div>)
      }
      <Switch>
        <Route path='/users/:id'>
          <IndUserView />
        </Route>
        <Route path='/users'>
          <UsersView />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/'>
          <div>
            {user !== null && <BlogList />}
            {user !== null && <NewBlog />}
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App