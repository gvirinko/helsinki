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

import './App.css'


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
    // dispatch(initializeComments())
  }, [])

  return (
    <Router>
      <ul className='nav-panel'>
        <li className='nav-panel_item'><Link style={padding} to='/'>blogs</Link></li>
        <li className='nav-panel_item'><Link style={padding} to="/users">users</Link></li>
        {user !== null &&
          <div className='nav-panel_login'>
            <li className='nav-panel_item'><p> {user.name} logged in.</p></li>
            <li className='nav-panel_item'><button type="submit" onClick={handleLogout}>Logout</button></li>
          </div>
        }

      </ul>
      <Notification notification={notification} />
      {user === null && <LoginForm />}
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
            {user !== null &&
              <div>
                <BlogList />
                <NewBlog />
              </div>
            }
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App