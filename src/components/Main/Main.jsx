import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ weatherData, clothingData, clothingItems, onCardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
    </main>
  );
}

export default Main;
