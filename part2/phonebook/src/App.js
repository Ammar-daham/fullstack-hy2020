import { useState } from 'react'

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
  const [search, setSearch] = useState([])

  console.log('search: ', search)
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

    setSearch(found)
    console.log('Found: ', search)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{' '}
        <input value={persons.name} onChange={handleSearchInputChange} />
      </div>
      <h2>Add a new</h2>
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
      <div>
        <h2>Filtered person</h2>
        {
          search 
          ?
            <p key={search.name}>
              {search.name} {search.number}
            </p>
          : <p>not found</p>
        }
      </div>
    </div>
  )
}

export default App
