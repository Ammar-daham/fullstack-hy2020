import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetails from './component/CountryDetails'
import UserInput from './component/UserInput'
import Forecast from './component/CountryForecast'

const App = () => {
  const [countries, setCountries] = useState([])

  const [filteredCountries, setFilteredCountries] = useState([])

  const [forecast, setForecast] = useState([])

  const apiId = process.env.REACT_APP_API_KEY

  countries.map((country) => console.log('country ', country.name.common))

  console.log('Filtered Countries ', filteredCountries)

  console.log('Forecast ', forecast)


  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      console.log('Promise fulfilled')
      console.log(response.data)
      setCountries(response.data)
    })
    if(filteredCountries.length === 1) {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital}&appid=${apiId}&units=metric`)
      .then((response) => {
        console.log("forecast: ", response.data)
        setForecast([response.data])
      })
    }
  }, [filteredCountries, apiId])

  const handleChange = (event) => {
    
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
      <UserInput handleChange={handleChange}/>

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
        ? (
          <div>
            <CountryDetails key={filteredCountries[0].name.common} country={filteredCountries[0]}/>
            <Forecast forecast={forecast}/>
          </div>
        )
        : false
        }
      </div>
    </div>
  )
}

export default App
