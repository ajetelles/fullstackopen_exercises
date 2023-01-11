import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import phoneService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [showFiltered, setShowFiltered] = useState(false)
  const [message, setMessage] = useState({content: null, type: 'notification'})
  //const [personsToShow, setPersonsToShow] = useState([...persons])

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const personsToShow = showFiltered
    // ? persons.filter(persons => persons.find(person => person.name.toLowerCase().includes(newFilter) || person.number.toLowerCase().includes(newFilter)))
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter) || person.number.toLowerCase().includes(newFilter))
    : persons

  const addPerson = (event) => {
    event.preventDefault() // prevents the default action of submitting a form
    const personObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1
    }

    if (persons.some(person => person.name === newName)) {
      // if person is already in phonebook, 
      // ask if they want to change the number
      //alert(`${newName} is already added to phonebook`)
      const personToUpdate = persons.find(p => p.name === newName)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedContact = { ...personToUpdate, number: newNumber}
        phoneService
          .create(personToUpdate.id, updatedContact)
          .then(() => {
            setPersons(persons.map(person => person.name !== newName ? person : updatedContact))
            setNewName('')
            setNewNumber('')
          })
        setMessage({
          content: `Updated number for ${newName}`,
          type: 'notification'
        })
        setTimeout(()=>{
          setMessage({content:null, type:'notification'})
        }, 5000)
      }
    } else {
      // create a person object by copying the text box contents (newName) 
      // and append it to the persons list
      phoneService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      setMessage({
         content: `Added ${newName}`,
         type: 'notification'
       })
       setTimeout(()=>{
         setMessage({content:null, type:'notification'})
       }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value )
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    console.log(newFilter)
    setShowFiltered(newFilter!=='')
    // setShowFiltered(persons.some(person => person.name.toLowerCase().includes(newFilter) || person.number.toLowerCase().includes(newFilter)))
    console.log(showFiltered)
  }

  const deletePerson = id => {
    console.log(`delete ${id}`)
    const personToDelete = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${personToDelete.name}?`)) {
      console.log('deleted')
      phoneService
        .remove(id)
        .then(success => {
          setMessage({
            content: success,
            type: 'notification'
          })
          setTimeout(()=>{
            setMessage({content:null, type:'notification'})
          }, 5000)
        })
        .catch(() => {
          setMessage({
            content: `Information of ${personToDelete.name} has already been removed from server`,
            type: 'error'
          })
          setTimeout(()=>{
            setMessage({content:null, type:'notification'})
          }, 5000)
        })
      // document.location.reload() // just to re-render
    } else {
      console.log('not deleted')
    }
  }

  console.log(personsToShow)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.content} type={message.type} />
      <Filter
        value={newFilter}
        onChange={handleFilter}
      />
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => 
          <Person key={person.name} person={person} deletePerson={deletePerson}/>
      )}
    </div>
  )
}

export default App