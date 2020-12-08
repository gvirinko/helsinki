import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => (
  <div style={message.type === 'error' ? { color: 'red' } : { color: 'green' }}>
    { message.text}
  </div >
)

Notification.propTypes = {
  message: PropTypes.object.isRequired
}

export default Notification
