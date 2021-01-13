import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { notificationSet } from '../reducers/notificationReducer'
import { loggingIn } from '../reducers/loginReducer'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      dispatch(loggingIn(user))
      dispatch(notificationSet('Logged in successfully', false, 5))
    }
    catch (exception) {
      dispatch(notificationSet('Wrong username or password.', true, 5))
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