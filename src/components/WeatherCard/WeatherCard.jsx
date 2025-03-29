import React from "react";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return null;
  }

  const { temperature, city, weatherType, weatherCondition, sunrise, sunset } =
    weatherData;

  const currentTime = Date.now() / 1000;
  const isDay = currentTime >= sunrise && currentTime < sunset;

  const getBackgroundClass = () => {
    const condition = weatherCondition.toLowerCase();

    if (condition.includes("clear")) {
      return isDay ? "weather-clear-day" : "weather-clear-night";
    } else if (condition.includes("cloud")) {
      return isDay ? "weather-cloudy-day" : "weather-cloudy-night";
    } else if (condition.includes("rain")) {
      return "weather-rainy";
    } else if (condition.includes("snow")) {
      return "weather-snowy";
    }
    return "weather-default";
  };

  return (
    <section className={`weather-card ${getBackgroundClass()}`}>
      <div className="weather-card__info">
        <p className="weather-card__temp">{temperature}°F</p>
        <p className="weather-card__city">{city}</p>
      </div>
    </section>
  );
}

export default WeatherCard;
