import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  console.log(persons)
  const [newName, setNewName] = useState('')
  console.log("newName: ",newName)


  const addPerson = (event) => {
    event.preventDefault()
    console.log("Name added: ", persons)
    const personObj = {
      name: newName
    }
    setPersons(persons.concat(personObj))
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
    console.log("new name: ", event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
          {
            persons.map( person => <p key={person.name}>{person.name}</p> )
          }
      </div>
    </div>
  )
}

export default App