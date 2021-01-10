import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => (
  <div
    className='error-message'
    style={notification.error ? { color: 'red' } : { color: 'green' }}
  >
    { notification.text}
  </div >
)

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification
