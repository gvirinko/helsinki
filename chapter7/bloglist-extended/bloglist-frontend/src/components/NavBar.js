import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { loggingOut } from '../reducers/loginReducer'

const NavBar = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(loggingOut())
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/'>blogs</Nav.Link>
          <Nav.Link as={Link} to="/users">users</Nav.Link>
          {user !== null &&
            <Nav.Link eventKey="disabled" disabled>{user.name} logged in.</Nav.Link>}
          {user !== null &&
              <Nav.Item><Button variant='secondary' type="submit" onClick={handleLogout}>Logout</Button></Nav.Item>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar