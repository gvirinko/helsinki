import React from 'react'
import { connect } from 'react-redux'
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

const Anecdotes = (props) => {

  const handleClick = (anecdote) => {
    props.vote(anecdote.id, anecdote.votes)
    props.setNotification(`You have just voted for: '${anecdote.content}'`, 3)
  }

  return (
    <div>
      {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote)}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const filterQuery = state.filter

  return {
    filter: state.filter,
    anecdotes: state.anecdotes
      .filter(item => item.content.toLowerCase().includes(filterQuery.toLowerCase()))
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes)