import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])

  const [filteredCountries, setFilteredCountries] = useState([])

  countries.map((country) => console.log('country ', country.name.common))

  console.log('Filtered Countries ', filteredCountries)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      console.log('Promise fulfilled')
      console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  const handleChange = (event) => {
    console.log('Value: ', event.target.value)
    const foundCountries = countries.filter((country) => {
      if (
        country.name.common
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase())
      ) {
        return country
      }
      return false
    })
    setFilteredCountries(foundCountries)
  }

  return (
    <div>
      <div>
        Find countries:
        <input onChange={handleChange} />
      </div>
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital}</p>
              <p>Area: {country.area}</p>
              <b>languages:</b>
              <ul>
                {Object.values(country.languages).map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
              <div>
                <img
                  src={Object.values(country.flags)[0]}
                  alt={country.name.common}
                  style={{ borderRadius: '1em' }}
                ></img>
              </div>
            </div>
          ))
        ) : (
          filteredCountries.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))
        )}
      </div>
    </div>
  )
}

export default App
