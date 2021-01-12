import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
// import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  // blogs: blogReducer,
  login: loginReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store