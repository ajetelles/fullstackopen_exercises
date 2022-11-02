import { useState } from 'react'

function randomnum(min,max) {
  return Math.floor(Math.random() * (max - min) + min) 
  //return Math.floor(Math.random() * (max - min + 1) + min)
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
      {anecdote} 
      <br />
      has {votes} votes
      <br />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [topselected, setTop] = useState(0)

  const selectRandom = () => setSelected(randomnum(0,anecdotes.length))
  const updateVotes = () => {
    let votescopy = [...votes]
    votescopy[selected] += 1
    setVotes(votescopy)
    setTop(votes.indexOf(Math.max(...votes)))
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" onClick={updateVotes}/>
      <Button text="next anecdote" onClick={selectRandom} />

      <Header text="Anecdote with most votes"/>
      <Anecdote anecdote={anecdotes[topselected]} votes={votes[topselected]} />
    </div>
  )
}

export default App