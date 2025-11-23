// src/components/Main/Main.jsx
import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// component: main content
function Main({
  weatherData,
  clothingItems,
  onCardClick,
  onCardLike,
  isLoggedIn,
}) {
  // state: contexts
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  // logic: current weather type
  const weatherType = weatherData?.weatherType;

  // logic: filter items by weather type
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  // helper: check liked items
  const isItemLikedByMe = (item) => {
    const me = currentUser?._id;
    if (!me) return false;

    const likes = Array.isArray(item.likes) ? item.likes : [];
    return likes.some((u) =>
      typeof u === "string" ? u === me : u?._id === me
    );
  };

  // ui: layout
  return (
    <main className="main">
      {/* ui: weather summary card */}
      <WeatherCard weatherData={weatherData} />

      {/* ui: summary text */}
      <p className="main__text">
        Today is {weatherData?.temperature?.[currentTemperatureUnit]}°
        {currentTemperatureUnit} / You may want to wear:
      </p>

      {/* ui: clothing grid */}
      <ul className="main__clothing-list">
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
            isLiked={isItemLikedByMe(item)}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
