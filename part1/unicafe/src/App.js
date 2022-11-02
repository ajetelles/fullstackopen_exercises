import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({name, stat}) => {
  if (name === "positive") {
    return (
      <tr>
        <td>{name}</td>
        <td>{stat}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{name}</td>
      <td>{stat}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  let average = Math.round((good - bad) / all * 100) / 100
  let positive = Math.round(good / all * 100) / 100

  if (all === 0){
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine name="good" stat={good}/>
        <StatisticLine name="neutral" stat={neutral}/>
        <StatisticLine name="bad" stat={bad}/>
        <StatisticLine name="all" stat={all}/>
        <StatisticLine name="average" stat={average}/>
        <StatisticLine name="positive" stat={positive}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const increaseGood = () => setGood(good+1)
  const increaseNeutral = () => setNeutral(neutral+1)
  const increaseBad = () => setBad(bad+1)

  return (
    <div>
      <Header text="give feedback"/>
      <Button text="good" onClick={increaseGood} />
      <Button text="neutral" onClick={increaseNeutral} />
      <Button text="bad" onClick={increaseBad} />
      <Header text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App