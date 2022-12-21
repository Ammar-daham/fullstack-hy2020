const CountryDetails = ({ country }) => (
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
)

export default CountryDetails
