import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const filterQuery = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
    .filter(item => item.content.toLowerCase().includes(filterQuery.toLowerCase()))

  const dispatch = useDispatch()

  const handleClick = (anecdote) => {
    dispatch(vote(anecdote.id, anecdote.votes))
    dispatch(setNotification(`You have just voted for: '${anecdote.content}'`, 3))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote)}
        />
      )}
    </div>
  )
}
export default Anecdotes