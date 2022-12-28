import { useState, useEffect } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Person from './component/Person'
import personService from './services/person'

const App = () => {

  const [persons, setPersons] = useState([])


  useEffect(() => {
    personService.getAll()
    .then(initialState => {
      console.log('Promise fulfilled')
      setPersons(initialState)
    })
  }, [])

  console.log("persons: ", persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPerson, setFilteredPerson] = useState([])

  console.log('Filtered Person: ', filteredPerson)
  console.log('newName: ', newName)
  console.log('newNumber: ', newNumber)

  const addPerson = ( event )  => {
    event.preventDefault()
    let personObj = persons.find(p => p.name === newName)
    if(personObj) {
      personObj = {...personObj, number: newNumber}
      console.log("personU: ", personObj )
      window.confirm(`${newName} is already added to phoneBook, replace the old number with a new one?`)
      ? (
        personService.update
        (personObj.id , personObj)
        .then(updatedPerson => {
          setPersons(persons.map( 
            person => person.name !== personObj.name ? person : updatedPerson))
          setNewName('')
          setNewNumber('')
          console.log('updated person: ', updatedPerson)
        })
      )
      : console.log('Old number not updated')
    } else {
      personObj = {
        name: newName,
        number: newNumber,
      }
      personService.create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        console.log("response: ", returnedPerson)
      })
    }
    

    
  }

  const handleNameInputChange = event => 
    setNewName(event.target.value)

  const handleNumberInputChange = event => 
    setNewNumber(event.target.value)
    

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
      <h2>PhoneBook</h2>

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

    {
      persons.map(person => (
        <Persons key={person.id} person={person} handleDelete={() => {
          window.confirm(`Delete ${person.name}`)
          ?
            personService.deletePerson(person.id)
            .then( () => 
              personService.getAll()
              .then(initialState => {
                console.log('Promise fulfilled')
                setPersons(initialState)
              })
            )
          :console.log('not deleted')
        }} />
        )) 
    }

      <h3>Filtered person</h3>

      <Person filtered={filteredPerson} />
    </div>
  )
}

export default App
