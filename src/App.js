import "./App.css";
import { useState } from "react";

function App() {
  // const [renderDOM, setRenderDOM] = useState(false);
  // const [lat, setLat] = useState();
  // const [lon, setLon] = useState();
  const [locationName, setLocationName] = useState();
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState();

  function handleClick() {
    getLocation(locationName);
  }

  function getLocation(locationName) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&appid=fed0b3710b7bef715d1a4f4e8864ffa9`
    )
      .then((response) => {
        return response.json();
      })
      .then((location) => {
        const { lat, lon } = location[0];
        getWeatherData({ lat,lon});
      })
      .catch((error) => {
        setError(error);
      });
  }

function getWeatherData({ lat, lon }) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fed0b3710b7bef715d1a4f4e8864ffa9`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function KtoC(k) {
    return Math.floor(k - 273.15);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          onChange={(e) => {
            setLocationName(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Get Weather
        </button>
      </header>
      <h2>Weather Data</h2>
      {weatherData && <p>Searched Location:______{locationName}</p>}
      {weatherData && <p>Temperature:______{KtoC(weatherData.main.temp)} C°</p>}
      {weatherData && <p>Max Temperature:______{KtoC(weatherData.main.temp_max)} C°</p>}
      {weatherData && <p>Min Temperature:______{KtoC(weatherData.main.temp_min)} C°</p>}
      {weatherData && <p>Weather:______{weatherData.weather[0].main}</p>}
      {weatherData && <p>Description:______{weatherData.weather[0].description}</p>}
      {weatherData && <p>Feels Like:______{KtoC(weatherData.main.feels_like)} C°</p>}
      {weatherData && <p>Humidity:______{weatherData.main.humidity}%</p>}
      {weatherData && <p>Wind Speed:______{weatherData.wind.speed} km/h</p>}
      {weatherData && <p>Wind Gust:______{weatherData.wind.gust} km/h</p>}
      {weatherData && <p>Weather Station:______{weatherData.name}</p>}
      {weatherData && <p>Timezone:______{weatherData.timezone}</p>}
      {weatherData && <p>Country:______{weatherData.sys.country}</p>}
      {weatherData && <p>Coordinates</p>}
      {weatherData && <p>Latitude: {weatherData.coord.lat}, Longitude: {weatherData.coord.lon}</p>}
      {!locationName && ! weatherData && <p>Type a location to get weather infomation.</p>}
    </div>
  );
}

export default App;
