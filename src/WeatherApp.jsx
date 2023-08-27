import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const WeatherApp = () => {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [city, setCity] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=b52a1217af194e27bfa155504223006&q=${city}`
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        const updatedWeatherDataList = [...weatherDataList, data];
        setWeatherDataList(updatedWeatherDataList);
        setCity(""); // Clear the input field after submitting
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center  bg-gradient-to-br from-gray-800 via-gray-900 to-black py-5">
      <h1 className="text-white text-3xl font-bold mb-4">Weather App</h1>
      <div className=" w-full flex justify-center">
        <form onSubmit={handleFormSubmit} className="flex w-full lg:w-3/5 p-5">
          <input
            type="text"
            id="city"
            placeholder="Enter your City name"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="w-full bg-transparent text-white px-4 py-2 rounded-s-3xl border focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <button
            type="submit"
            className="text-bold border w-1/3 lg:w-1/6 text-white px-4 py-2 rounded-r-3xl focus:outline-none hover:bg-gray-800"
          >
            Get Weather
          </button>
        </form>
      </div>

      <div className="p-4 lg:p-8 w-full flex gap-6 flex-wrap justify-center ">
        {/* Search Section */}

        {/* Weather Data View Section */}
        {weatherDataList.map((weatherData, index) => (
          <div
            key={index}
            className="text-center p-8 rounded-lg shadow-black shadow-2xl  w-full max-w-[40rem] flex flex-col gap-6"
          >
            <div className="flex items-baseline gap-3">
              <div className="text-3xl flex flex-col md:text-5xl text-white font-bold">
                {weatherData.location.name}
                <span className="text-gray-600 text-[14px] md:text-xl font-bold">
                  {" "}
                  {weatherData.location.localtime}
                </span>
              </div>
              <div className="text-gray-600 text-[14px] md:text-xl font-bold">
                {weatherData.current.condition.text}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <img
                src={weatherData.current.condition.icon}
                alt=""
                className=""
              />
              <div className="text-white text-4xl font-bold ">
                {weatherData.current.temp_c}°C
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-lg text-white font-bold flex flex-col xs:flex-row gap-1 items-baseline">
                  Feels like :
                  <span className="text-md text-gray-600 font-bold">
                    {weatherData.current.feelslike_c}°C
                  </span>
                </p>
                <p className="text-lg text-white font-bold flex flex-col xs:flex-row gap-1 items-baseline">
                  Humidity :
                  <span className="text-md text-gray-600 font-bold">
                    {weatherData.current.humidity} %
                  </span>
                </p>
                <p className="text-lg text-white font-bold flex flex-col xs:flex-row gap-1 items-baseline">
                  Visibility :
                  <span className="text-md text-gray-600 font-bold">
                    {weatherData.current.vis_km} km
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-lg text-white font-bold flex flex-col xs:flex-row gap-1 items-baseline">
                  Feels like :
                  <span className="text-md text-gray-600 font-bold">
                    {weatherData.current.feelslike_f}°F
                  </span>
                </p>
                <p className="text-lg text-white font-bold flex flex-col xs:flex-row gap-1 items-baseline">
                  Wind speed :
                  <span className="text-md text-gray-600 font-bold">
                    {weatherData.current.wind_kph} kp/h
                  </span>
                </p>
                <p className="text-lg text-white font-bold flex flex-col xs:flex-row gap-1 items-baseline">
                  Last updated :
                  <span className="text-md text-gray-600 font-bold">
                    {weatherData.current.last_updated}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
