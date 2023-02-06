import React from 'react';

const PersonForm = ({
  handleSubmit,
  name,
  number,
  handleNameChange,
  handleNumberChange,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={name} onChange={handleNameChange} required />
    </div>
    <div>
      number: <input value={number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
