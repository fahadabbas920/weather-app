import "./App.css";
import { useState} from "react";
import WeatherDataDisplay from "./components/weatherDataDisplay";
// import PollutionDataDisplay from "./components/pollutionDataDisplay";
// import { weatherDatas } from "./components/globalValues";
import PollutionDataDisplay from "./components/pollutionDataDisplay";

function App() {
  // const [renderDOM, setRenderDOM] = useState(false);
  // const [lat, setLat] = useState();
  // const [lon, setLon] = useState();
  const [locationName, setLocationName] = useState();
  // const [weatherForecast, setWeatherforcast] = useState({
  // const [Data,setData] = useContext(weatherDatas)
  // console.log(Data)
  // });
  const [airPollution, setAirPollution] = useState();
  // const [airPollution, setAirPollution] = useState({
  //   co: 0,
  //   nh3: 0,
  //   no: 0,
  //   no2: 0,
  //   o3: 0,
  //   pm2_5: 0,
  //   pm10: 0,
  //   so2: 0,
  //   dt: 0,
  //   aqi : 0
  // });
  // const [liveLoc, setLiveLoc] = useState();
  // const [state, setstate] = useState(""); //used for weather map
  // const [weatherData, setWeatherData] = useState();
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
    icon: "NaN"
  });
  //
  const [error, setError] = useState("");
  console.log(error);
  function handleClick() {
    if (!locationName) {
      console.log("Please Enter a Location");
    } else {
      getLocation(locationName);
    }
  }

  function handleLiveLocation() {
    navigator.geolocation.getCurrentPosition((e) => {
      const { latitude: lat, longitude: lon } = e.coords;
      console.log(e);
      getWeatherData({ lat, lon });
      fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=fed0b3710b7bef715d1a4f4e8864ffa9`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLocationName(data[0].name);
          console.log(data);
        });
    });
  }

  // function timeConverter(UNIX_timestamp) {
  //   var a = new Date(UNIX_timestamp * 1000);
  //   var months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   var year = a.getFullYear();
  //   var month = months[a.getMonth()];
  //   var date = a.getDate();
  //   var hour = a.getHours();
  //   var min = a.getMinutes();
  //   var sec = a.getSeconds();
  //   var time =
  //     date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  //   return time;
  // }
  // console.log(timeConverter(0));

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
          icon: data.weather[0].icon
        });
        console.log(data);
        getForcast({ lat, lon });
        getPollutionData({ lat, lon });
        // getWeatherMap({ lat, lon });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //4611456521
  /////////////////////////////////////////////////////////////Forecast////////////////////////////////////////////////////////
  function getForcast({ lat, lon }) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fed0b3710b7bef715d1a4f4e8864ffa9`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /////////////////////////////////////////////////////////////Pollution///////////////////////////////////////////////////////
  function getPollutionData({ lat, lon }) {
    fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=fed0b3710b7bef715d1a4f4e8864ffa9`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAirPollution(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /////////////////////////////////////////////////////////////Weather Map///////////////////////////////////////////////////////

  // function getWeatherMap({ lat, lon }) {
  //   fetch(
  //     `https://tile.openweathermap.org/map/precipitation_new/25/${Math.floor(
  //       lon
  //     )}/${Math.floor(lat)}.png?appid=fed0b3710b7bef715d1a4f4e8864ffa9`
  //   )
  //     // fetch("https://th.bing.com/th?id=ORMS.9efa4050627dc119f75b7303598b88de&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1.25&p=0")
  //     .then((res) => {
  //       return res.blob();
  //     })
  //     .then((data) => {
  //       const imageObjectURL = URL.createObjectURL(data);
  //       setstate(imageObjectURL);
  //       // console.log(imageObjectURL)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // function KtoC(k) {
  //   return Math.floor(k - 273.15);
  // }
  function handleCBtnPD() {
    document.getElementById("pollutionData").style.display = "block";
  }

  return (
    <div className="App">
      <header className="App-header">
        <small>This app is currently in development mode. Will implement better GUI after all the necessary functions are implemented</small>
        <input
        placeholder="Type Location Name"
          onChange={(e) => {
            setLocationName(e.target.value);
            
          }}
        ></input>
        <small>If some location does not appear, try to type the complete location name e.g. Silicon Oasis, Dubai, UAE.</small>
        <small>Please allow location in-case of live location, If you have pressed block, You need to enable it from browser site setting.</small>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Get Weather
        </button>
        <button
          onClick={() => {
            handleLiveLocation();
          }}
        >
          Live Location
        </button>
        {/* <button onClick={()=>{getForcast({lat,lon})}}>
          getForcast
        </button> */}
        <h4>{!locationName && "Please Enter a Location"}</h4>
        {/* <h4>{error}</h4>/ */}
        <button
          onClick={() => {
            handleCBtnPD();
          }}
          id="openBtnPD"
        >
          Open Air Pollution
        </button>
      </header>
      <WeatherDataDisplay
        weatherData={weatherData}
        locationName={locationName}
        // KtoC={KtoC}
        // timeConverter={timeConverter}
      ></WeatherDataDisplay>
      {/* {state && <img src={state} alt="hehe" width={200} height={200} />} */}
      {/* {airPollution && <PollutionDataDisplay pollutionData={airPollution}></PollutionDataDisplay>} */}
      <PollutionDataDisplay pollutionData={airPollution}></PollutionDataDisplay>
    </div>
  );
}

export default App;
