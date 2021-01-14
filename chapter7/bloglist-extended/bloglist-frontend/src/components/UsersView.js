import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'

const UsersView = () => {
  const user = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    user !== null &&
        <div>
          <h3>Users:</h3>
          <table>
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
          </table>
        </div>
  )
}

export default UsersView