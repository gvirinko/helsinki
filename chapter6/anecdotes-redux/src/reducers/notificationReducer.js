const notificationAtStart = "Here is my start notification."

const notificationReducer = (state = notificationAtStart, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification, delay) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      }) }, delay * 1000)
  }
}



export default notificationReducer