// src/components/WeatherCard/WeatherCard.jsx
import React, { useContext } from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// component: weather card
function WeatherCard({ weatherData }) {
  // ui: loading fallback
  if (!weatherData) {
    return <section className="weather-card">Loading weather...</section>;
  }

  // state: context + data
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { temperature, weatherCondition, sunrise, sunset } = weatherData;

  // logic: day or night
  const now = Date.now() / 1000;
  const isDay = now >= sunrise && now < sunset;

  // logic: weather image key
  const weatherKey = weatherCondition?.toLowerCase?.() || "clear";
  const dayNight = isDay ? "day" : "night";

  // mapping: background image paths
  const bgSrcMap = {
    "clouds-day": "/se_project_react/weather/cloudy-day.jpg",
    "clouds-night": "/se_project_react/weather/cloudy-night.jpg",
    "rain-day": "/se_project_react/weather/rain-day.jpg",
    "rain-night": "/se_project_react/weather/rain-night.jpg",
    "snow-day": "/se_project_react/weather/snow-day.jpg",
    "snow-night": "/se_project_react/weather/snow-night.jpg",
    "clear-day": "/se_project_react/weather/sunny-day.jpg",
    "clear-night": "/se_project_react/weather/sunny-night.jpg",
    "fog-day": "/se_project_react/weather/fog-day.jpg",
    "fog-night": "/se_project_react/weather/fog-night.jpg",
    "thunderstorm-day": "/se_project_react/weather/storm-day.jpg",
    "thunderstorm-night": "/se_project_react/weather/storm-night.jpg",
  };

  // logic: resolved background image
  const key = `${weatherKey}-${dayNight}`;
  const bgSrc = bgSrcMap[key] || bgSrcMap["clear-day"];

  // ui: render
  return (
    <section className="weather-card">
      {/* ui: background */}
      <img className="weather-card__bg" src={bgSrc} alt="" aria-hidden="true" />

      {/* ui: temperature */}
      <p className="weather-card__temp">
        {temperature?.[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
