import React from 'react'
const Notification = ({ message }) => (
    <div style={message.type === 'error' ? { color: 'red' } : { color: 'green' }}>
        { message.text}
    </div >
)

export default Notification
