import axios from 'axios'
import {asObject} from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  // console.log(response.data)
  return response.data
}

const createNew = async (content) => {
  const object = asObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id, votes) => {
  const response = await axios.patch(`${baseUrl}/${id}`, {votes: votes + 1})
  return response.data
}

export default {getAll, createNew, addVote}