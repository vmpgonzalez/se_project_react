import React, { useState, useEffect } from "react";
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
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        if (data) {
          setWeatherData(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load weather data:", err);
      });

    setClothingItems(defaultClothingItems);
  }, []);

  const handleOpenItemModal = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleCloseItemModal = () => {
    setIsItemModalOpen(false);
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
        onCardClick={handleOpenItemModal}
      />

      <Footer />

      {isItemModalOpen && (
        <ItemModal onClose={handleCloseItemModal} item={selectedItem} />
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
