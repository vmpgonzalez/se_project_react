import { useState, useEffect } from "react";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import { getWeatherData } from "../../utils/weatherApi";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    getWeatherData().then((data) => {
      if (data) {
        setWeatherData(data);
      }
    });

    setClothingItems(defaultClothingItems);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="app">
      <Header weatherData={weatherData} />
      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
      />
      <Footer />
      {isModalOpen && (
        <ItemModal onClose={handleCloseModal} item={selectedItem} />
      )}
    </div>
  );
}

export default App;
