import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Person from './component/Person'

const App = () => {

  const [persons, setPersons] = useState([])

  const baseUrl = 'http://localhost:3001/persons'

  useEffect(() => {
    console.log("effect")
    axios.get(baseUrl)
    .then(response => {
      console.log('Promise fulfilled')
      setPersons(response.data)
    })
  }, [])

  console.log("persons: ", persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPerson, setFilteredPerson] = useState([])

  console.log('Filtered Person: ', filteredPerson)
  console.log('newName: ', newName)

  const addPerson = (event) => {
    event.preventDefault()
    let personObj = {}
    persons.map((person) => {
      if(person.name === newName) { 
        alert(`${newName} is already added to phonebook`)
        setPersons([...person])
      } else {
        personObj = {
          name: newName,
          number: newNumber,
        }
      }
    })
    axios.post(baseUrl, personObj)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      console.log("response: ", response.data)
    })
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
    console.log('Found: ', found)
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

      <Persons persons={persons} />

      <h3>Filtered person</h3>

      <Person filtered={filteredPerson} />
    </div>
  )
}

export default App
