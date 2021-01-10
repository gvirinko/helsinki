import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const changeBlog = async newObject => {
  const url = `${baseUrl}/${newObject.id}`
  const response = await axios.put(url, newObject)
  return response.data
}

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blogId}`
  try {
    const response = await axios.delete(url, config)
    return response.data
  }
  catch (error) {
    console.log(error)
  }

}

const findById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, setToken, create, changeBlog, deleteBlog, findById }