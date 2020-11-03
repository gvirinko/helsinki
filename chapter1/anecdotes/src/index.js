import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [random, setRandom] = useState("");
  const [voted, setVoted] = useState({});
  // const [maxVoted, setMaxVoted] = useState({});

  const getRandom = (array) => {
    let anecdote = array[Math.floor(Math.random() * array.length)];
    setRandom(anecdote);
  }

  const handleRandomClick = () => {
    getRandom(anecdotes);
  }

  const handleVoteClick = () => {
    if (random in voted) {
      setVoted({ ...voted, [random]:  voted[random] + 1 });
    } else {
      setVoted({ ...voted, [random]: 1 });
    }
    // getMaxVoted();
  }

  // const getMaxVoted = () => {
  //   // console.log(voted);
  //   let arrOfValues = Object.values(voted).sort();
  //   let maxValue = arrOfValues[arrOfValues.length];
  //   let maxVoted = Object.keys(voted).find(key => voted[key] === maxValue);
  //   setMaxVoted({ [maxVoted]: maxValue });
  // }

  return (
    <div>
      <div>{random}</div>
      <br/>
      <button onClick={handleRandomClick}>Click for an Anecdote</button>
      <button onClick={handleVoteClick}>Vote</button>
      {/* <br />
      {maxVoted && 
        <>
            <p>Here is the most voted anecdote: </p>
            <p> "{maxVoted[0]}"</p>
            <p>This anecdote has {maxVoted[1]} vote(s).</p>
          </>
      } */}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)


