// all code in this example is copied from fullstack open lessons

import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  // const hook = () => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }
  useEffect(() => {
    // get data from server and update notes with it
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes) 
      })
  },[])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault() // prevents the default action of submitting a form
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    }
    
    // edit notes from the server directly throug the addNote event handler
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })

    // create a note object by copying the text box contents (newNote) 
    // and append it to the notes list
    // setNotes(notes.concat(noteObject)) 
    // setNewNote('') // empty the textbox
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value) // saves current textbox contents to newNote
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important) // only show notes where important === true

  const toggleImportanceOf = id => {
    console.log(`importance of ${id} needs to be toggled`)
    const note = notes.find(n => n.id === id) // finds the note we want to modify 
    const changedNote = { ...note, important: !note.important } // create new object that copies old note but changes the value of important
    // always make a copy of an object, never mutate it directly 

    // send changedNote into a put request  to edit the note in the server
    // if n.id !== id, note (downloaded by the browser) will stay the same, otherwise it will
    // change and become the newly edited note in the server
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `The note '${note.content}' was already deleted from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)

        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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