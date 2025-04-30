import React, { useState, useEffect } from "react";
import "./App.css";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import { getWeatherData } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    getWeatherData().then((data) => {
      if (data) {
        setWeatherData(data);
      }
    });

    setClothingItems(defaultClothingItems);
  }, []);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };
  return (
    <div className="page">
      <Header weatherData={weatherData} onAddClick={handleAddClick} />

      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
      />

      <Footer />

      {isModalOpen && (
        <ItemModal onClose={handleCloseModal} item={selectedItem} />
      )}

      {isAddModalOpen && (
        <ModalWithForm
          title="New garment"
          name="add"
          buttonText="Add garment"
          onClose={handleCloseAddModal}
          onSubmit={(e) => {
            e.preventDefault();
            handleCloseAddModal();
          }}
        >
          <label className="modal__label modal__label-name">
            Name
            <input type="text" name="name" required placeholder="Name" />
          </label>

          <label className="modal__label modal__label-image">
            Image
            <input type="url" name="link" required placeholder="Image URL" />
          </label>

          <label className="modal__label">
            Select the weather type:
            <div className="modal__radio-group">
              <label>
                <input type="radio" name="weather" value="hot" /> Hot
              </label>
              <label>
                <input type="radio" name="weather" value="warm" /> Warm
              </label>
              <label>
                <input type="radio" name="weather" value="cold" /> Cold
              </label>
            </div>
          </label>
        </ModalWithForm>
      )}
    </div>
  );
}

export default App;
