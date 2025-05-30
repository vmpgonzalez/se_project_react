import React from "react";
import "./WeatherCard.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return <div className="weather-card">Loading weather...</div>;
  }

  const { temperature, weatherCondition, sunrise, sunset } = weatherData;

  const currentTime = Date.now() / 1000;
  const isDay = currentTime >= sunrise && currentTime < sunset;

  const weatherKey = weatherCondition.toLowerCase();
  const dayNight = isDay ? "day" : "night";

  const cardClass = `weather-card weather-card--${weatherKey}-${dayNight}`;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className={cardClass}>
      <p className="weather-card__temp">
        {weatherData?.temperature?.[currentTemperatureUnit]}°
        {currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
