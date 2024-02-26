import './App.css'
import { useState } from 'react';
import { FaTemperatureHigh } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

function App() {
  let [city, setCity] = useState('');
  let [updateData , setUpdateData] = useState();
  
  const setData = (event)=>{
    setCity(event.target.value); 
  }

  async function getApi(api){
    let res = await fetch(api)
    let data = await res.json();
    if(data.cod === "404" || data.cod === "400"){
      setUpdateData(undefined)
    }else{
      setUpdateData(data);
    }
  }

  const getData = (event)=>{
    const apikey = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6dac17b56db735916ae314337660957e`;
    getApi(apikey);
    event.preventDefault();
    setCity('');
  }

  return (
    <div className='main'>
      
      <div className="container">
        <h1>Country Weather</h1>
          <form onSubmit={getData}>
            <div className="head">
              <input type="text" onChange={setData} value={city} placeholder='Type Country name'/> <button>Search</button>
            </div>
          </form>
          {updateData!==undefined?<h1>{updateData.name}</h1>:''}

        <div className="middle">
          {updateData!== undefined ?
          <>
          <img src={`http://openweathermap.org/img/w/${updateData.weather[0].icon}.png`} />
          <h3>{updateData.weather[0].main}</h3>
          </>
          :
          <h1>Data Not Found</h1>
          }

        </div>

        <div className="foot">
          {updateData!==undefined?
          <>
            <div>
              <h2>{updateData.main.temp} °C</h2>
              <div  className='same'>
              <span>Temp</span> <FaTemperatureHigh className='icon'/> 
              </div>
           </div>
           <div>
              <h2>{updateData.main.humidity}</h2>
              <div className='same'>
              <span>Humidity</span>  <WiHumidity className='icon'/>
              </div>
           </div>
           <div>
              <h2>{updateData.wind.speed}</h2>
              <div className='same'>
              <span>Wind</span> <FaWind className='icon'/>
              </div>
           </div>
          </>
          :
            ''
          }
        </div>
      </div>
    </div>
  )
}

export default App
