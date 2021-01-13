let timeoutId // to solve a bug, when removing first notification also removes second one


const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'REMOVE_NOTIFICATION':
    return {}
  default:
    return state
  }
}

export const notificationSet = (text, error, delay) => {
  clearTimeout(timeoutId)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        text: text,
        error: error
      }
    })
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, delay * 1000)
  }
}

export default notificationReducer