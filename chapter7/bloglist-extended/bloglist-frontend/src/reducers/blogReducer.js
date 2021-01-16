import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'UPDATE_BLOG':
    return state.map(item => {
      if (item.id !== action.data.id) {
        return item
      }
      return {
        ...item,
        ...action.data
      }
    })
  case 'DELETE_BLOG':
    return state.filter(item => item.id !== action.data.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addNewBlog = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: blog
  }
}

export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: blog
  }
}

export const deleteBlog = (blog) => {
  return {
    type: 'DELETE_BLOG',
    data: blog
  }
}

export default blogReducer