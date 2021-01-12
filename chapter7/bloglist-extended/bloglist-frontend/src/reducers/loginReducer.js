
const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN': {
    return action.data
  }
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const loggingIn = (user) => {
  return {
    type: 'LOGIN',
    data: user
  }
}

export const loggingOut = () => {
  return {
    type: 'LOGOUT'
  }
}

export default loginReducer