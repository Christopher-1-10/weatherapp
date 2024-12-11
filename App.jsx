
// import the images

import searchIcon from "./assets/search.jpg";
import clearIcon from "./assets/clearIcon.jpg";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.jpg";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";
import { useEffect, useState } from "react";

// weather details
function WeatherDetail({icon , temp , city , country , lat , long , humidity , wind }){
  return(
    <>
    <div className="status">
          <img src={icon} className="weather-logo" alt="weather" />
         
        </div>
        <div className="details">
        <div className="celsius">{temp}°C</div>
        <div className="city">{city}</div>
        <div className="country">{country}</div>

        </div>
        <div className="coab">
          <div className="lat">
            <span>latitude</span><span className="value">{lat}</span>

          </div>
          <div className="long">
            <span>longitude</span><span className="value">{long}</span>

          </div>
        </div>

        <div className="res">
          <div className="humi">
            <img className="humidity" src={humidityIcon} alt="weather" />
            <div className="speed">{humidity}%</div>
            <div className="speed1">Humidity</div>
          </div>
          <div className="win">
            <img className="wind" src={windIcon} alt="weather" />
            <div className="speed" >{wind} Km/h</div>
            <div className="speed1" >Wind Speed</div>
          </div>
       </div>   

    </>
  )
}


// main app

export default  function App() {

  const apikey="d09f5ffb548e881ca236d853bb0f5af4";

  const [icon,setIcon]=useState(cloudIcon)
  const [temp,setTemp]=useState(0)
  const [city,setCity]=useState("")
  const [country,setCountry]=useState("")
  const [lat,setLat]=useState(0)
  const [long,setLong]=useState(0)
  const [humidity,setHumidity]=useState(0)
  const [wind,setWind]=useState(0)
 

  const [text, setText]=useState('trichy')
  const [citynotfound,setCitynotfound]= useState(false)
  const[error,setError]=useState(false)
  const [loading,setLoading]=useState(false)

const weathericonmap={
  "01d":clearIcon,
  "01n":clearIcon,
  "02d":cloudIcon,
  "02n":cloudIcon,
  "03d":drizzleIcon,
  "03n":drizzleIcon,
  "04d":drizzleIcon,
  "04n":drizzleIcon,
  "09d":rainIcon,
  "09n":rainIcon,
  "10d":rainIcon,
  "10n":rainIcon,
  "13d":snowIcon,
  "13n":snowIcon,

}
  async function Search(){
    setLoading(true)
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`

    try{
      let res=await fetch(url)
      let data=await res.json();
      // console.log(data);
      if(data.cod === "404"){
        console.log("City Not Found")
        setCitynotfound(true)
        setLoading(false)
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(data.main.temp);
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      setCitynotfound(false)


      const weatherIconCode= data.weather[0].icon;
      setIcon( weathericonmap[weatherIconCode] || clearIcon);




    }
    catch(error){
      console.log("An error Occurred: ", error.message);
      setError("somthing went to wrong")

    }

    finally{
      setLoading(false)
    }
    
  }

  function Handletext(e){
      setText(e.target.value)
  }
  function HandleKey(e){
    if(e.key === "Enter"){
      Search();
    }
  }


  useEffect(function (){
    Search()
  },[]);



  

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" placeholder="Search City" className="input-box" onChange={Handletext}
           value={text} onKeyDown={HandleKey} />
          <div className="search" onClick={Search}>
            <img src={searchIcon} className="search-img" alt="search" />
          </div> 
        </div>

        {!loading && !citynotfound && <WeatherDetail icon={icon} temp={temp} city={city} country={country}  lat={lat} long={long}
         humidity={humidity} wind={wind}    />}

         {loading && <div className="loading-message">Loading...</div>}
         {error && <div className="error-message">{error}</div>}
         {citynotfound && <div className="city-not-found">City Not Found</div>}

        

        <div className="copyright">
          <p>Designed by <span className="">Christopher</span></p>
        </div>
  

      </div>
    </>
  )
}


