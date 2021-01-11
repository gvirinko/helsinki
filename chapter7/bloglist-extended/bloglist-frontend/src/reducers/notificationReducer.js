
const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const notificationSet = (text, error) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: {
      text: text,
      error: error
    }
  }
}

export default notificationReducer