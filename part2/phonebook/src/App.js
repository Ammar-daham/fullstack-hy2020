import { useState, useEffect } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Person from './component/Person'
import personService from './services/person'
import Notification from './component/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPerson, setFilteredPerson] = useState([])

  useEffect(() => {
    personService.getAll().then((initialState) => {
      setPersons(initialState)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let personObj = persons.find((p) => p.name === newName)
    if (personObj) {
      personObj = { ...personObj, number: newNumber }
      window.confirm(
        `${newName} is already added to phoneBook, replace the old number with a new one?`,
      )
        ? personService
            .update(personObj.id, personObj)
            .then((updatedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.name !== personObj.name ? person : updatedPerson,
                ),
              )
              setNewName('')
              setNewNumber('')
              setSuccessMessage(`${updatedPerson.name}'s number changed`)
              setTime(setSuccessMessage)
            }).catch( () => {
              setErrorMessage(`Information of ${personObj.name} has already been removed from server `)
              setTime(setErrorMessage)
            })
        : console.log('Old number not updated')
    } else {
      personObj = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObj)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTime(setSuccessMessage)
        })
        .catch(error => {
          console.log('error: ', error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTime(setErrorMessage)
        })
    }
  }

  const setTime = (message) => {
    setTimeout(() => {
      message(null)
    }, 5000)
  }

  const handleNameInputChange = (event) => setNewName(event.target.value)

  const handleNumberInputChange = (event) => setNewNumber(event.target.value)

  const handleSearchInputChange = (event) => {
    const found = persons.find(
      (person) =>
        person.name.toLowerCase() === event.target.value.toLowerCase(),
    )
    setFilteredPerson(found)
  }

  return (
    <div>
      <h2>PhoneBook</h2>

      <Notification successMessage={successMessage} errorMessage={errorMessage} />

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

      {persons.map((person) => (
        <Persons
          key={person.id}
          person={person}
          handleDelete={() => {
            window.confirm(`Delete ${person.name}`)
              ? personService.deletePerson(person.id).then(() => {
                  setSuccessMessage(`Deleted ${person.name}`)
                  setTime(setSuccessMessage)
                  personService.getAll().then((initialState) => {
                    console.log('Promise fulfilled')
                    setPersons(initialState)
                  })
                }).catch( () => {
                  setErrorMessage(`${person.name} has already been removed from the server`)
                  setTime(setErrorMessage)
                })
              : console.log('not deleted')
          }}
        />
      ))}

      <h3>Filtered person</h3>

      <Person filtered={filteredPerson} />
    </div>
  )
}

export default App
