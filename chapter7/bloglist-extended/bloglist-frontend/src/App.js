import React, { useEffect } from 'react'
import {
  Switch, Route
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import NavBar from './components/NavBar'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import UsersView from './components/UsersView'
import IndUserView from './components/IndUserView'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import './App.css'


const App = () => {
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  return (
    <div className='container'>
      <NavBar user={user} />
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
    </div>
  )
}

export default App