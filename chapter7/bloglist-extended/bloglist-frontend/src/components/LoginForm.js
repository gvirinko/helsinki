import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { notificationSet } from '../reducers/notificationReducer'
import { loggingIn } from '../reducers/loginReducer'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const error = 'error'
  const dispatch = useDispatch()
  // const dispatch2 = useDispatch()

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
      // console.log(user)
      // window.localStorage.setItem('LoggedBloglistAppUser', JSON.stringify(user))
      // setUser(user)
      dispatch(loggingIn(user))
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

  return (
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
}

export default LoginForm