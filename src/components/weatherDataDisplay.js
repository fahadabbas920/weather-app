import { changeTemp } from "./funcLibrary";
import { timeConverter } from "./funcLibrary";
import { useState } from "react";
import { useEffect } from "react";
import { changT } from "./funcLibrary";
import { changeSpeed } from "./funcLibrary";

const WeatherDataDisplay = ({ weatherData, locationName }) => {
  //   console.log(weatherData, locationName);

  const [state, setstate] = useState("");

  useEffect(() => {
    if (weatherData.icon === "NaN") {
      console.log("Not");
    } else {
      fetch(`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`)
        .then((res) => {
          return res.blob();
        })
        .then((data) => {
          const imageObjectURL = URL.createObjectURL(data);
          setstate(imageObjectURL);
        })
        .catch((value) => {
          console.log(value);
        });
    }
  }, [weatherData.icon]);

  // const [rad, setrad] = useState(1);
  // const [t, sett] = useState('');
  // if(rad===1){
  //   sett('C°')
  // }else if(rad===2){
  //   sett('K')
  // } else if(rad ===3){
  //   sett('F°')
  // }
  const [metricToggleVal,setMerticToggleVal] = useState()
  const [metric, setMetric] = useState('m/s')

  function changeSize(value) {
    if (value === 1) {
      document.getElementById("one").style.fontWeight = "500";
      document.getElementById("two").style.fontWeight = "100";
      setMetric('m/s')
    } else if (value === 2) {
      document.getElementById("two").style.fontWeight = "500";
      document.getElementById("one").style.fontWeight = "100";
      setMetric('Mph')

    }
  }
const [time,month,year,hour,min,sec] = timeConverter(weatherData.dt)
  return (
    <div>
      {/* <form onSubmit={(e)=>{console.log("submitted")}}>
      <input type={"radio"}></input>
      <input type={"radio"}></input>
      <input type={"radio"}></input>
      </form> */}
      {/* <div>
        <button
          onClick={() => {
            setrad(1);
          }}
        >
          Celcius
        </button>
        <button
          onClick={() => {
            setrad(2);
          }}
        >
          Kelvin
        </button>
        <button
          onClick={() => {
            setrad(3);
          }}
        >
          Farenheit
        </button>

        <h2>Weather Data</h2>
        <img src={state} alt={"icon"}></img>
        {weatherData && <p>Searched Location:______{locationName}</p>}
        {weatherData && (
          <p>
            Sunrise:______{timeConverter(weatherData.sunrise)} UTC<br></br>
            Sunset:______{timeConverter(weatherData.sunset)} UTC
          </p>
        )}
        {weatherData && (
          <p>
            Temperature:____________{changeTemp(weatherData.temp, rad)}{" "}
            {changT(rad)}
          </p>
        )}
        {weatherData && (
          <p>
            Max Temperature:________{changeTemp(weatherData.max_temp, rad)}{" "}
            {changT(rad)}
          </p>
        )}
        {weatherData && (
          <p>
            Min Temperature:________{changeTemp(weatherData.min_temp, rad)}{" "}
            {changT(rad)}
          </p>
        )}
        {weatherData && <p>Weather:________________{weatherData.weather}</p>}
        {weatherData && <p>Clouds:________________{weatherData.clouds} %</p>}
        {weatherData && (
          <p>Description:____________{weatherData.description}</p>
        )}
        {weatherData && (
          <p>
            Feels Like:_____________{changeTemp(weatherData.feels_like, rad)}{" "}
            {changT(rad)}
          </p>
        )}
        {weatherData && (
          <p>Pressure:_______________{weatherData.pressure} mbar</p>
        )}
        {weatherData && <p>Humidity:_______________{weatherData.humidity}%</p>}
        {weatherData && <p>Wind Speed:_____________{weatherData.wind} m/s</p>}
        {weatherData && <p>Wind Gust:______________{weatherData.gust} m/s</p>}
        {weatherData && (
          <p>Weather Station:________{weatherData.weather_station}</p>
        )}
        {weatherData && <p>Timezone:_______________{weatherData.timezone}</p>}
        {weatherData && <p>Country:________________{weatherData.country}</p>}
        {weatherData && <p>Coordinates</p>}
        {weatherData && (
          <p>
            Latitude: {weatherData.lat}, Longitude: {weatherData.lon}
          </p>
        )}
        {!locwationName && !weatherData && (
          <p>Type a location to get weather infomation.</p>
        )}
      </div> */}
      <div id="weth-container">
        {/* <button
      className="btn-in btn"
          onClick={() => {
            setrad(1);
          }}
        >
          Celcius
        </button>
        <button
        className="btn-in btn"
          onClick={() => {
            setrad(2);
          }}
        >
          Kelvin
        </button>
        <button
        className="btn-in btn"
          onClick={() => {
            setrad(3);
          }}
        >
          Farenheit
        
        </button> */}
        

        <header id="weth-weather">
         <div id="img-container"> {weatherData && <img src={state} alt={"icon"}></img>}</div>
          
          {weatherData && <h1>{changeTemp(weatherData.temp, metricToggleVal)}°</h1>}
          <div id="changeTemp-btn">
            {
              <h2
                id="one"
                onClick={() => {
                  // setrad(1);
                  setMerticToggleVal(1)
                  changeSize(1);
                }}
              >
                C
              </h2>
            }
            |
            <h2
              id="two"
              onClick={() => {
                // setrad(3);
                setMerticToggleVal(2)
                changeSize(2);
              }}
            >
              F
            </h2>
          </div>
          <div id="header-des">
            {weatherData && <p>{weatherData.weather}</p>}
            {weatherData && <p>{locationName}</p>}
          </div>
        </header>
        <main id="main">
          <div className="main-des">
            <p>Weather Time</p>
            <p>Description</p>
            <p>Pressure:</p>
            <p>Humidity:</p>
            <p>Wind Speed:</p>
            <p>Country:</p>
          </div>
          <div className="main-des">
            {weatherData && <p>{hour}:{min} UTC</p>}
            {weatherData && <p>{weatherData.description}</p>}
            {weatherData && <p>{weatherData.pressure} mbar</p>}
            {weatherData && <p>{weatherData.humidity}%</p>}
            {weatherData && <p>{changeSpeed(metricToggleVal, weatherData.wind)} {metric} </p>}
            {weatherData && <p>{weatherData.country}</p>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WeatherDataDisplay;
