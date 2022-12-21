import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetails from './component/CountryDetails'

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

  // const handleShowClick = (event) => {
  //   event.preventDefault()
  //   setShowDetails(true)
  //   console.log(country)
  // }

  return (
    <div>
      <div>
        Find countries:
        <input onChange={handleChange} />
      </div>

      <div>
        {
        filteredCountries.length > 10
        ? <p>Too many matches, specify another filter</p>
        : filteredCountries.length > 1
        ? filteredCountries.map( country  => (          
            <p key={country.name.common}>{country.name.common}
            <button onClick={() => setFilteredCountries([country])}>show</button></p>
        )) 
        : filteredCountries.length === 1
        ? <CountryDetails key={filteredCountries[0].name.common} country={filteredCountries[0]}/>
        : false
        }
      </div>
    </div>
  )
}

export default App
