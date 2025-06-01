import React, { useState, useEffect } from "react";
import { getWeatherData } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { Routes, Route, HashRouter } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api.js";
import DeleteConfirmationModal from "../DeleteConfirmationModal.jsx/DeleteConfirmationModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

    getClothingItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Failed to load clothing items:", err);
      });
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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };
  const handleAddItemSubmit = (newItem) => {
    addClothingItem(newItem)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
        setIsAddModalOpen(false); //
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const openConfirmModal = (item) => {
    setItemToDelete(item);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    deleteClothingItem(itemToDelete._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== itemToDelete._id)
        );
        setSelectedItem(null);
        setIsItemModalOpen(false);
        setIsConfirmModalOpen(false);
        setItemToDelete(null);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };
  return (
    <HashRouter>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <Header weatherData={weatherData} onAddClick={handleAddClick} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleOpenItemModal}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleOpenItemModal}
                  onAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />

          {isItemModalOpen && (
            <ItemModal
              item={selectedItem}
              onClose={handleCloseItemModal}
              onDelete={openConfirmModal}
            />
          )}

          {isAddModalOpen && (
            <AddItemModal
              isOpen={isAddModalOpen}
              onCloseModal={handleCloseAddModal}
              onAddItem={handleAddItemSubmit}
            />
          )}

          {isConfirmModalOpen && (
            <DeleteConfirmationModal
              isOpen={isConfirmModalOpen}
              onClose={() => setIsConfirmModalOpen(false)}
              onConfirm={handleConfirmDelete}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </HashRouter>
  );
}

export default App;
