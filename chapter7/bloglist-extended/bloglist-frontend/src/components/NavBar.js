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
          {/* <Nav.Link> */}
          <Link to='/'>blogs</Link>
          {/* </Nav.Link> */}
          {/* <Nav.Link> */}
          <Link to="/users">users</Link>
          {/* </Nav.Link> */}
          {user !== null &&
            <Nav.Link eventKey="disabled" disabled>{user.name} logged in.</Nav.Link>}
          {user !== null &&
              <Nav.Item><Button type="submit" onClick={handleLogout}>Logout</Button></Nav.Item>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <ul className='nav-panel'>
    //   <li className='nav-panel_item'><Link to='/'>blogs</Link></li>
    //   <li className='nav-panel_item'><Link to="/users">users</Link></li>
    //   {user !== null &&
    //     <div className='nav-panel_login'>
    //       <li className='nav-panel_item'><p> {user.name} logged in.</p></li>
    //       <li className='nav-panel_item'><button type="submit" onClick={handleLogout}>Logout</button></li>
    //     </div>
    //   }
    // </ul>
  )
}

export default NavBar