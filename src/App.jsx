import './App.css';
import { useState } from 'react';
import { FaTemperatureHigh } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

function App() {
  let [city, setCity] = useState('');
  let [updateData, setUpdateData] = useState(null);  // Start with null to differentiate initial state

  const setData = (event) => {
    setCity(event.target.value);
  };

  async function getApi(api) {
    let res = await fetch(api);
    let data = await res.json();
    if (data.cod === "404" || data.cod === "400") {
      setUpdateData(undefined);  // Undefined means data not found
    } else {
      setUpdateData(data);  // Set valid data
    }
  }

  const getData = (event) => {
    let apiUrl;
    if (city.toLowerCase() === "india") {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Delhi,IN&units=metric&appid=6dac17b56db735916ae314337660957e`;
    } else {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6dac17b56db735916ae314337660957e`;
    }
    getApi(apiUrl);
    event.preventDefault();
    setCity('');
  };

  return (
    <div className='main'>
      <div className="card">
        <h1 className="title">Weather App</h1>
        <form onSubmit={getData}>
          <div className="search">
            <input type="text" onChange={setData} value={city} placeholder='Enter city or country name' />
            <button>Search</button>
          </div>
        </form>

        {updateData === null ? (
          <h2 className="initial-message">Enter a city to get weather information</h2>
        ) : updateData === undefined ? (
          <h1 className="error">Data Not Found</h1>
        ) : (
          <>
            <h1 className="city-name">{updateData.name}</h1>
            <div className="weather-info">
              <img src={`http://openweathermap.org/img/w/${updateData.weather[0].icon}.png`} alt="weather icon" />
              <h3>{updateData.weather[0].main}</h3>
            </div>
            <div className="details">
              <div className="detail-item">
                <h2>{updateData.main.temp} °C</h2>
                <div className='label'>
                  <span>Temperature</span> <FaTemperatureHigh className='icon' />
                </div>
              </div>
              <div className="detail-item">
                <h2>{updateData.main.humidity}%</h2>
                <div className='label'>
                  <span>Humidity</span> <WiHumidity className='icon' />
                </div>
              </div>
              <div className="detail-item">
                <h2>{updateData.wind.speed} m/s</h2>
                <div className='label'>
                  <span>Wind Speed</span> <FaWind className='icon' />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
