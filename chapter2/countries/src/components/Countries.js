import React, {useState} from 'react';
import Country from './Country'

const Countries = ({ filtered }) => {
    const [showCountry, setShowCountry] = useState(false);
    const [country, setCountry] = useState("");

    const handleClick = (country) => {
        setCountry(country);
        setShowCountry(true);
    }

    return (
        <div>
            {filtered.length > 10
                ? <p>Too many matches, please be more specific.</p>
                : filtered.length > 1
                    ? filtered.map(item =>
                        <p key={item.numericCode}>{item.name}
                        <button onClick={() => {
                                handleClick(item);
                        }}>Show</button>
                        </p>)
                    : filtered.length === 1
                        ? <Country country={filtered[0]}/>
                        : <p>Nothing found yet.</p>
            }
            <div>{showCountry ? <Country country={country} /> : null}</div>
        </div>
    );
}

export default Countries;