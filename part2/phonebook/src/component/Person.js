const Person = ({ filtered }) => (
  <div>
    {filtered ? (
      <p key={filtered.name}>
        {filtered.name} {filtered.number}
      </p>
    ) : (
      <p>not found</p>
    )}
  </div>
)

export default Person
