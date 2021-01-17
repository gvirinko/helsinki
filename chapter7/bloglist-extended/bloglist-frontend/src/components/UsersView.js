import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersView = () => {
  const user = useSelector(state => state.login)
  const users = useSelector(state => state.users)

  return (
    user !== null &&
        <div>
          <h3>Users:</h3>
          <Table hover>
            <thead>
              <tr>
                <td>Name</td>
                <td>Blogs created</td>
              </tr>
            </thead>
            <tbody>
              {users.map(user =>
                (<tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
  )
}

export default UsersView