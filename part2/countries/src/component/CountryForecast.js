import WeatherIcon from './WeatherIcon'

const Forecast = ({ forecast }) => {
  return (
    <div>
      {forecast.length > 0 ? (
        <>
          <h2>Weather in {forecast[0].name}</h2>
          <p>temperature {forecast[0].main.temp} Celcius</p>
          <WeatherIcon forecast={forecast} />
          <p>wind {forecast[0].wind.speed} m/s</p>
        </>
      ) : (
        false
      )}
    </div>
  )
}

export default Forecast
