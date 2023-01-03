import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [showFiltered, setShowFiltered] = useState(false)
  //const [personsToShow, setPersonsToShow] = useState([...persons])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
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
      id: persons.length + 1
    }

    if (persons.some(person => person.name === newName)) {
      // if person is already in phonebook, send alert
      alert(`${newName} is already added to phonebook`)
    } else {
      // create a person object by copying the text box contents (newName) 
      // and append it to the persons list
      setPersons(persons.concat(personObject)) 
      setNewName('') // empty the textbox
      setNewNumber('') 
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

  console.log(personsToShow)

  return (
    <div>
      <h2>Phonebook</h2>
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
          <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default App