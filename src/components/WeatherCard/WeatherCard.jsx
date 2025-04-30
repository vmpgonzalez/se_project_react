import React from "react";
import "./WeatherCard.css";

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

  return (
    <section className={cardClass}>
      <p className="weather-card__temp">{temperature}°F</p>
    </section>
  );
}

export default WeatherCard;
