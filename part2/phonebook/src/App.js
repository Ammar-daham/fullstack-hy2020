import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '04022321',
    },
  ])

  console.log(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  console.log('newName: ', newName)

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Name added: ', persons)
    const personObj = {
      name: newName,
      number: newNumber
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  )
}

export default App
