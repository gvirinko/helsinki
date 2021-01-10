import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'


const store = createStore(notificationReducer, composeWithDevTools())

export default store