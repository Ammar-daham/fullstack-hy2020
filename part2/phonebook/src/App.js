import { useState } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Person from './component/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  console.log(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPerson, setFilteredPerson] = useState([])

  console.log('Filtered Person: ', setFilteredPerson)
  console.log('newName: ', newName)

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Name added: ', persons)
    const personObj = {
      name: newName,
      number: newNumber,
    }
    persons.filter((person) =>
      person.name === personObj.name
        ? setPersons([...persons]) +
          alert(`${personObj.name} is already added to phonebook`)
        : setPersons(persons.concat(personObj)),
    )
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
    console.log('new name: ', event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
    console.log('new number: ', event.target.value)
  }

  const handleSearchInputChange = (event) => {
    const found = persons.find(
      (person) =>
        person.name.toLowerCase() === event.target.value.toLowerCase(),
    )
    found
      ? console.log(`${event.target.value} found`)
      : console.log(`${event.target.value} not found`)

    setFilteredPerson(found)
    console.log('Found: ', filteredPerson)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter name={persons.name} handleChange={handleSearchInputChange} />

      <h3>Add a new</h3>

      <PersonForm
        handleSubmit={addPerson}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameInputChange}
        handleNumberChange={handleNumberInputChange}
      />

      <h3>Numbers</h3>
      
      <Persons persons={persons}/>

      <h3>Filtered person</h3>
      
      <Person filtered={filteredPerson}/>

    </div>
  )
}

export default App
