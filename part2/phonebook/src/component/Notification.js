import React from 'react'
import '../index.css'

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }

  return (
    <div>
      {
        successMessage &&
          <div className="success">{successMessage}</div>
      }
      {
        errorMessage &&
          <div className="error">{errorMessage}</div>
      }
    </div>
  )
}

export default Notification
