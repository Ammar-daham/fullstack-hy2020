const WeatherIcon = ({ forecast }) => {
  const weatherIcon = `https://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`
  return <img src={weatherIcon} alt="weather-icon" />
}

export default WeatherIcon
