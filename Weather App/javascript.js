const link = "https://api.weatherapi.com/v1/current.json?key=b77e9fc79d404b88978161625241011";
let root = document.getElementById('root');
let store = {
    country:"Ukraine",
    city: "Kyiv",
    temperature: 5, 
    feelsLike:1,
    visibility:10,
    time: "10"
}
const fetchData = async ()=>{
    try{
        let data = await fetch(`${link}&q=${store.city}`);
        if(!data.ok){
            throw new Error(`Can not get a Data, because: ${data.status}, ${data.statusText}`);
        }
        let jsonData = await data.json()
        console.log( "first", jsonData);
        const { 
            location: {name:city, localtime:time}, 
             current: {temp_c:temperature, feelslike_c:feelsLike, vis_km:visibility, cloud, wind_kph:wind, humidity, 
            precip_mm:precip,
            condition:{text:weatherConditions}}}=jsonData;
        store={
            city,
            time,
            temperature,
            feelsLike,
            visibility,
            cloud,
            wind,
            humidity,
            precip,
            weatherConditions
        }
        console.log(store);  
        showInfo();
        popup();

    }
    catch (error) {
        console.error(`Error: ${error}`);
    }   
}

function showWeatherImg(weatherCondition){
switch(weatherCondition){
    case "Sunny":
        return "img/weather_conditions/Sunny.png";
        break;
    case "Partly cloudy":
        return "img/weather_conditions/Partlycloudy.png";
        break;
    case "Cloudy":
        return "img/weather_conditions/Cloudy.png";
        break;
    case "Overcast":
        return "img/weather_conditions/Overcast.png";
        break;
    case "Mist":
        return "img/weather_conditions/Mist.png";
        break;
    case "Blowing snow":
        return "img/weather_conditions/Blowingsnow.png";
        break;
    case "Blizzard":
        return "img/weather_conditions/Blizzard.png";
        break;
    case "Fog":
        return "img/weather_conditions/Fog.png";
        break;
    case "Light rain":
        return "img/weather_conditions/Lightrain.png";
        break; 
    case "Heavy rain":
        return "img/weather_conditions/Heavyrain.png";
        break;
    case "Light sleet":
        return "img/weather_conditions/Lightsleet.png";
        break;
    case "Moderate snow":
        return "img/weather_conditions/Moderatesnow.png";
        break;
    case "Clear":
        return "img/weather_conditions/Clear.png";
        break;
    case "Overcast":
        return "img/weather_conditions/Overcast.png";
        break;
    default:
        return "img/weather_conditions/Default.png";
        break; 

}
}
function infoBlock(){
    const {city, time, temperature, weatherConditions, feelsLike, visibility, cloud, wind, humidity, precip }=store;
    const dateObj = new Date(time);
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    return `
    <div class="container">
      <div class="top">
       <p class="inf_weather_place">Weather in</p>
       <p class="weather_place" id="weather_place">${city}</p>
       <div class="top_img_time">
        <div class="top_img_time_block_01">
         <img src="${showWeatherImg(weatherConditions)}" alt="" class="weather_conditions_img" id="weather_conditions">
        </div>
        <div class="top_img_time_block_02">
        <div class="top_img_time_block_02_mini">
        <p class="top_as_of">As of </p>
         <p class="top_time" id="top_time">${formattedTime}</p>
         </div>
          <p class="weather_temperature" id="weather_temperature">${temperature}<span>°С</span></p>
        </div>
       </div>
       <span class="weather_conditions" id="weatherConditions">${weatherConditions}</span>
      </div>


  <div class="top_02">

  <div class="top_block_01">
    <div class="top_block_sub_block">
      <div class="top_block_for_img">
        <img class="top_block_img" src="img/description_icons/thermometer.png" alt="">
      </div>
      <div class="top_block_for_text">
        <p class="top_block_01_text_01 description_style" id="top_block_01_text_01"><span class="des_inf">${feelsLike}</span> <span class="des_icon__mini">°С</span></p>
        <p class="top_block_01_text_02 description_style"><span class="des_text">Feels like</span></p>
      </div>
    </div>

    <div class="top_block_sub_block">
      <div class="top_block_for_img">
        <img class="top_block_img" src="img/description_icons/low-visibility.png" alt="">
      </div>
      <div class="top_block_for_text">
        <p class="top_block_01_text_03 description_style" id="top_block_01_text_02"><span class="des_inf">${visibility}</span> <span class="des_icon__mini">%</span></p>
        <p class="top_block_01_text_04 description_style"><span class="des_text">Visibility</span></p>
      </div>
    </div>
    </div>
 
    


  <div class="top_block_02">
    <div class="top_block_sub_block">
      <div class="top_block_for_img">
        <img class="top_block_img" src="img/description_icons/cloud (1).png" alt="">
      </div>
      <div class="top_block_for_text">
        <p class="top_block_02_text_01 description_style" id="top_block_02_text_01"><span class="des_inf">${cloud}</span> <span class="des_icon__mini">%</span></p>
        <p class="top_block_02_text_02 description_style"><span class="des_text">Cloudiness</span></p>
      </div>
    </div>
    
    <div class="top_block_sub_block">
      <div class="top_block_for_img">
        <img class="top_block_img" src="img/description_icons/storm.png" alt="">
      </div>
      <div class="top_block_for_text">
        <p class="top_block_02_text_03 description_style" id="top_block_02_text_02"><span class="des_inf">${wind}</span> <span class="des_icon__mini">km/h</span></p>
        <p class="top_block_02_text_04 description_style"><span class="des_text">Wind speed</span></p>
      </div>
    </div>
    </div>
    


  <div class="top_block_03">
    <div class="top_block_sub_block">
      <div class="top_block_for_img">
        <img class="top_block_img" src="img/description_icons/humidity.png" alt="">
      </div>
      <div class="top_block_for_text">
        <p class="top_block_03_text_01 description_style" id="top_block_03_text_01"><span class="des_inf">${humidity}</span> <span class="des_icon__mini">%</span></p>
        <p class="top_block_03_text_02 description_style"><span class="des_text">Humidity</span></p>
      </div>
    </div>

    <div class="top_block_sub_block">
      <div class="top_block_for_img">
        <img class="top_block_img" src="img/description_icons/precipitation.png" alt="">
      </div>
      <div class="top_block_for_text">
        <p class="top_block_03_text_03 description_style" id="top_block_03_text_02"><span class="des_inf">${precip}</span> <span class="des_icon__mini">mm</span></p>
        <p class="top_block_03_text_04 description_style"><span class="des_text">Precipitation</span></p>
      </div>
    </div>
   
    
  </div>
</div>
       
      
    </div>
    `
}
function showInfo(){
    root.innerHTML = infoBlock();
}
function popup(){
    let popup = document.getElementById('popup');
    let weatherPlace = document.querySelector(".weather_place")
    weatherPlace.addEventListener('click', () => {
        popup.classList.toggle('popup_active');
    });
}
let inputText = document.getElementById('text-input');
let form = document.getElementById('form');

const handleInput = (e) => {
  store = {
    ...store,
    city: e.target.value
  };
};


inputText.addEventListener('input', handleInput);


const handleSubmit = (e) => {
  e.preventDefault(); 
  fetchData();
  popup();
};


form.addEventListener('submit', handleSubmit);

fetchData();
