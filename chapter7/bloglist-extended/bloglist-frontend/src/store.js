import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
// import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  // blogs: blogReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store