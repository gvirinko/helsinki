import React from 'react';
import Weather from './Weather';

const Country = ({country}) => {
    return (
        <div>
            <h2>{country.name} </h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <p>Languages:</p>
                <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>) }
            </ul>
            <img src={country.flag} alt="Flag of this country" style={{ width: "300px" }}></img>
            <Weather city={country.capital} />
        </div>
    );
}

export default Country;