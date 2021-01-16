import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  notification: notificationReducer,
  users: userReducer,
  comments: commentReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store