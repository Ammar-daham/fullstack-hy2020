
const Persons = ({ person, handleDelete }) => (
  <div>
        <p>
          {person.name} {person.number}
          <button onClick={handleDelete}>delete</button>
        </p>   
  </div>
)

export default Persons
