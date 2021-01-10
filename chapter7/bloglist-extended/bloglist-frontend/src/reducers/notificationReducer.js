
const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'REMOVE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const notificationSet = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: {
      text: notification.text,
      error: notification.error
    }
  }
}

export default notificationReducer