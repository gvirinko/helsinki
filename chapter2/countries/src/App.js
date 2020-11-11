import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleChange = (event) => {
    const queryCountry = event.target.value;
    setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(queryCountry.toLowerCase())));
  }

  return (
    <div>
      <p>Find country / countries: <input onChange={handleChange}></input></p>
      <Countries filtered={filteredCountries}/>
    </div>
  );
}

export default App;
