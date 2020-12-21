import React from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteForm />
      <Anecdotes />
    </div>
  )
}

export default App