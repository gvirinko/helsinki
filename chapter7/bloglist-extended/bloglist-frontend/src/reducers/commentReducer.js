import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_COMMENT':
    return [...state, action.data]
  case 'INIT_COMMENTS':
    return action.data
  default:
    return state
  }
}

export const initializeComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments
    })
  }
}

export const addNewComment = (comment) => {
  return {
    type: 'NEW_COMMENT',
    data: comment
  }
}

export default commentReducer