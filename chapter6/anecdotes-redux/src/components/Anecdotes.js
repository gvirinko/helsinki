import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(vote(anecdote.id))}
        />
        // <div key={anecdote.id}>
        //   <div>
        //     {anecdote.content}
        //   </div>
        //   <div>
        //     has {anecdote.votes}
        //     <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
        //   </div>
        // </div>
      )}
    </div>
  )
}
export default Anecdotes