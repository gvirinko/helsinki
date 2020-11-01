import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text, value}) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total * 100;
  return (
    <>
      <h2>Feedback Statistics</h2>
      {good === 0 && neutral === 0 && bad === 0
        ? <p>No feedback yet</p>
        :
        <table>
          <tbody>
            <Statistic text="Good:" value={good} />
            <Statistic text="Neutral: " value={neutral}/>
            <Statistic text="Bad: " value={bad}/>
            <Statistic text="Total: " value={total}/>
            <Statistic text="Average: " value={average}/>
            <Statistic text="Positive: " value={positive}/>
          </tbody>
        </table>
      }
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (type) => {
    return () => {
      switch (type) {
        case "good":
          setGood(good + 1);
          break;
        case "neutral":
          setNeutral(neutral + 1);
          break;
        case "bad":
          setBad(bad + 1);
          break;
        default:
          break;
      }
  }}

  return (
    <div>
      <h2>Please give your feedback</h2>
      <button onClick={handleClick("good")}>good</button>
      <button onClick={handleClick("neutral")}>neutral</button>
      <button onClick={handleClick("bad")}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)