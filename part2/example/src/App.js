import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  useEffect(hook,[])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault() // prevents the default action of submitting a form
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    
    // create a note object by copying the text box contents (newNote) 
    // and append it to the notes list
    setNotes(notes.concat(noteObject)) 
    setNewNote('') // empty the textbox
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value) // saves current textbox contents to newNote
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important) // only show notes where important === true

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App