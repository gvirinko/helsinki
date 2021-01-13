import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlog from './components/NewBlog'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'


const App = () => {
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <div>
      <Notification notification={notification} />
      {user === null && <LoginForm />}
      { user !== null && <BlogList /> }
      { user !== null && <NewBlog />}
    </div>
  )
}

export default App