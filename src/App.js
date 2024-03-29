import "./App.css";
import { useState, useEffect, useRef } from "react";
import WeatherDataDisplay from "./components/weatherDataDisplay";
// import PollutionDataDisplay from "./components/pollutionDataDisplay";
// import { weatherDatas } from "./components/globalValues";
// import PollutionDataDisplay from "./components/pollutionDataDisplay";

function App() {
  const [locationName, setLocationName] = useState();
  const [error, setError] = useState("");
  const [geoError, setGeoError] = useState("");

  // const [airPollution, setAirPollution] = useState();



  
  const inputref = useRef();

  const [weatherData, setWeatherData] = useState({
    temp: "NaN",
    max_temp: "NaN",
    min_temp: "NaN",
    weather: "NaN",
    clouds: "NaN",
    description: "NaN",
    feels_like: "NaN",
    pressure: "NaN",
    humidity: "NaN",
    wind: "NaN",
    gust: "NaN",
    weather_station: "NaN",
    timezone: "NaN",
    country: "NaN",
    lat: "NaN",
    lon: "NaN",
    icon: "NaN",
    dt: "NaN",
  });

  useEffect(() => {
    navigator.permissions &&
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (PermissionStatus) {
          if (PermissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition((e) => {
              const { latitude: lat, longitude: lon } = e.coords;
              getWeatherData({ lat, lon });
              getLocationName({ lat, lon });
            });
          } else if (PermissionStatus.state === "prompt") {
            // prompt - not yet grated or denied
            console.log("prompt");
            setGeoError("Please Enable Live Location.");
          } else {
            //denied
            console.log("denied");
            setGeoError(
              `Live Location permission denied. Please enable Live Location and click live location button.`
            );
          }
        });
  }, []);

  console.log(error);
  function handleClick(value) {
    if (!value) {
      console.log("Please Enter a Location");
    } else if (locationName === value) {
      console.log("Already there");
    } else {
      getLocation(value);
      setLocationName(value);
    }
  }

  function getLocationName({ lat, lon }) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=fed0b3710b7bef715d1a4f4e8864ffa9`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLocationName(data[0].name);
        // console.log(data);
      });
  }

  function handleLiveLocation() {
    navigator.geolocation.getCurrentPosition((e) => {
      const { latitude: lat, longitude: lon } = e.coords;
      console.log(e);
      setGeoError("");
      getWeatherData({ lat, lon });
      getLocationName({ lat, lon });
      // fetch(
      //   `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=fed0b3710b7bef715d1a4f4e8864ffa9`
      // )
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setLocationName(data[0].name);
      //     console.log(data);
      //   });
    });
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
        getWeatherData({ lat, lon });
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
        setWeatherData({
          temp: data.main.temp,
          max_temp: data.main.temp_max,
          min_temp: data.main.temp_min,
          weather: data.weather[0].main,
          clouds: data.clouds.all,
          description: data.weather[0].description,
          feels_like: data.main.feels_like,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          gust: data.wind.gust,
          weather_station: data.name,
          timezone: data.timezone,
          country: data.sys.country,
          lat: data.coord.lat,
          lon: data.coord.lon,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          icon: data.weather[0].icon,
          dt: data.dt,
        });
        // console.log(data.dt);
        // getForcast({ lat, lon });
        // getPollutionData({ lat, lon });
        // getWeatherMap({ lat, lon });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function handleCBtnPD() {
  //   document.getElementById("pollutionData").style.display = "block";
  // }

  return (
    <div className="App">
      <div id="bg">.</div>
      <div className="myApp">
        <header className="App-header">
          <input
            className="input-field"
            placeholder="Type Location Name"
            ref={inputref}
          ></input>
          <button
            onClick={() => {
              handleClick(inputref.current.value);
            }}
            className="btn-out btn"
          >
            Get Weather
          </button>
          <button
            onClick={() => {
              handleLiveLocation();
            }}
            className="btn-out btn"
          >
            Live Location
          </button>
          {/* <button onClick={()=>{getForcast({lat,lon})}}>
          getForcast
        </button> */}
          <h4 id="InputRef">{!locationName && "Please Enter a Location"}</h4>
          {navigator.geolocation ? <h3 id="geoError">{geoError}</h3> : ""}
          {/* <h4>{error}</h4>/ */}
          {/* <button
          onClick={() => {
            handleCBtnPD();
          }}
          id="openBtnPD"
        >
          Open Air Pollution
        </button> */}
        </header>
        <WeatherDataDisplay
          weatherData={weatherData}
          locationName={locationName}
        ></WeatherDataDisplay>
        {/* {state && <img src={state} alt="hehe" width={200} height={200} />} */}
        {/* {airPollution && <PollutionDataDisplay pollutionData={airPollution}></PollutionDataDisplay>} */}
        {/* <PollutionDataDisplay pollutionData={airPollution}></PollutionDataDisplay> */}
      </div>
    </div>
  );
}

export default App;
