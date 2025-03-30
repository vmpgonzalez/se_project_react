import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, onCardClick }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData?.weatherType
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <ul className="item-card-list">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
