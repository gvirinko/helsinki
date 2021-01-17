import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form, Col } from 'react-bootstrap'
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
    <div>
      <h4 style={{
        'margin':'20px 0 30px 0' }}> Please log in to application:</h4>
      <Form onSubmit={handleLogin}>
        <Col lg={4}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              xs={1}
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}/>
          </Form.Group>
          <Button variant='success' className='login-button' type="submit">Login</Button>
        </Col>
      </Form>
    </div>)
}

export default LoginForm