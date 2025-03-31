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
    <div className="app">
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
          title="Add Garment"
          name="add"
          buttonText="Add"
          onClose={handleCloseAddModal}
          onSubmit={(e) => {
            e.preventDefault();
            handleCloseAddModal();
          }}
        >
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Image URL:
            <input type="url" name="link" required />
          </label>
          <label>
            Select Weather:
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
