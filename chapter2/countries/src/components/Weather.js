import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({city}) => {
    const key = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${key}&query=${city}`)
            .then(response => {
                const apiWeather = {
                    city: response.data.location.name,
                    temperature: response.data.current.temperature,
                    windSpeed: response.data.current.wind_speed,
                    windDirection: response.data.current.wind_dir,
                    icon: response.data.current.weather_icons[0]
                }
                setWeather(apiWeather);
            })
            .catch(error => {
                console.log(error);
            })
    }, [city, key]);

    return (
        <div>
            <h3>Weather in {weather.city}</h3>
            <img src={weather.icon} alt="Icon depicting current weather"></img>
            <p>Temperature: {weather.temperature}℃</p>
            <p>Wind: {weather.windSpeed} mph, direction: {weather.windDirection}</p>
        </div>
    );
}

export default Weather;