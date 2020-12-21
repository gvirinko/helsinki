const notificationAtStart = "Here is my start notification."

const notificationReducer = (state = notificationAtStart, action) => {
  switch (action.type) {
    case 'START':
      return state
    default:
      return state
  }
}

export const notificationAction = (notification) => {
  return {
    type: 'START',
    notification
  }
}

export default notificationReducer