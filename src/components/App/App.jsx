// src/components/App/App.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

// components
import Header from "../Header/Header";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal.jsx/DeleteConfirmationModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

// utils + contexts
import { getWeatherData } from "../../utils/weatherApi";
import {
  getClothingItems as getClothingItemsPublic,
  addClothingItem as addClothingItemProtected,
  deleteClothingItem as deleteClothingItemProtected,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../../utils/api.js";
import * as auth from "../../utils/auth";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [busy, setBusy] = useState(false);

  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    getWeatherData()
      .then((data) => data && setWeatherData(data))
      .catch((err) => console.error("Failed to load weather data:", err));

    getClothingItemsPublic()
      .then(setClothingItems)
      .catch((err) => console.error("Failed to load clothing items:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setAuthReady(true);
      return;
    }
    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => setAuthReady(true));
  }, []);

  const handleOpenItemModal = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };
  const handleCloseItemModal = () => {
    setIsItemModalOpen(false);
    setSelectedItem(null);
  };
  const handleAddClick = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);
  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));

  const handleRegister = useCallback(
    async ({ name, avatar, email, password }) => {
      try {
        setBusy(true);
        await auth.signup({ name, avatar, email, password });
        const { token } = await auth.signin({ email, password });
        localStorage.setItem("jwt", token);
        const me = await auth.checkToken(token);
        setCurrentUser(me);
        setIsLoggedIn(true);
        setRegisterOpen(false);
      } catch (e) {
        alert(e.message);
      } finally {
        setBusy(false);
      }
    },
    []
  );

  const handleLogin = useCallback(async ({ email, password }) => {
    try {
      setBusy(true);
      const { token } = await auth.signin({ email, password });
      localStorage.setItem("jwt", token);
      const me = await auth.checkToken(token);
      setCurrentUser(me);
      setIsLoggedIn(true);
      setLoginOpen(false);
      setLoginError(null);
    } catch {
      setLoginError("Email or password incorrect");
      setLoginOpen(true);
    } finally {
      setBusy(false);
    }
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  }, []);

  const openLoginFromRegister = useCallback(() => {
    setRegisterOpen(false);
    setLoginOpen(true);
    setLoginError(null);
  }, []);

  const openRegisterFromLogin = useCallback(() => {
    setLoginOpen(false);
    setRegisterOpen(true);
    setLoginError(null);
  }, []);

  const handleAddItemSubmit = (newItem) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Please sign in to add items.");
      return;
    }
    const payload = {
      name: newItem.name,
      imageUrl: newItem.link,
      weather: newItem.weather,
    };

    addClothingItemProtected(payload, token)
      .then((createdItem) => {
        setClothingItems((prev) => [createdItem, ...prev]);
        setIsAddModalOpen(false);
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const openConfirmModal = (item) => {
    setItemToDelete(item);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Please sign in to delete items.");
      return;
    }
    deleteClothingItemProtected(itemToDelete._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((it) => it._id !== itemToDelete._id)
        );
        setSelectedItem(null);
        setIsItemModalOpen(false);
        setIsConfirmModalOpen(false);
        setItemToDelete(null);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handleCardLike = useCallback(({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Please sign in to like items.");
      return;
    }
    (!isLiked ? addCardLike(id, token) : removeCardLike(id, token))
      .then((updatedCard) =>
        setClothingItems((cards) =>
          cards.map((c) => (c._id === id ? updatedCard : c))
        )
      )
      .catch((err) => console.error("Like error:", err));
  }, []);

  // REQUIRED FIX BELOW ⬇⬇⬇
  const handleUpdateProfile = useCallback(({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    setBusy(true);
    updateUser({ name, avatar }, token)
      .then((updated) => {
        // FIX: Preserve _id and all existing fields
        setCurrentUser((prevUser) => ({
          ...prevUser,
          name: updated.name,
          avatar: updated.avatar,
        }));
        setEditOpen(false);
      })
      .catch((e) => alert(e.message))
      .finally(() => setBusy(false));
  }, []);
  // REQUIRED FIX ABOVE ⬆⬆⬆

  const currentUserValue = useMemo(() => currentUser, [currentUser]);

  return (
    <HashRouter>
      <CurrentUserContext.Provider value={currentUserValue}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <Header
              weatherData={weatherData}
              onAddClick={handleAddClick}
              isLoggedIn={isLoggedIn}
              onOpenLogin={() => {
                setLoginOpen(true);
                setLoginError(null);
              }}
              onOpenRegister={() => {
                setRegisterOpen(true);
                setLoginError(null);
              }}
              onSignOut={handleSignOut}
              onOpenEditProfile={() => setEditOpen(true)}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleOpenItemModal}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isAuthReady={authReady}
                  >
                    <Profile
                      clothingItems={clothingItems.filter((i) => {
                        const ownerId =
                          typeof i.owner === "string" ? i.owner : i.owner?._id;
                        return currentUser && ownerId === currentUser._id;
                      })}
                      onCardClick={handleOpenItemModal}
                      onAddClick={handleAddClick}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                      onEditProfile={() => setEditOpen(true)}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
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

            <RegisterModal
              isOpen={isRegisterOpen}
              onClose={() => setRegisterOpen(false)}
              onRegister={handleRegister}
              isLoading={busy}
              onSwitchToLogin={openLoginFromRegister}
            />
            <LoginModal
              isOpen={isLoginOpen}
              onClose={() => {
                setLoginOpen(false);
                setLoginError(null);
              }}
              onLogin={handleLogin}
              isLoading={busy}
              onOpenRegister={() => {
                setLoginOpen(false);
                setRegisterOpen(true);
                setLoginError(null);
              }}
              authError={loginError}
              onClearAuthError={() => setLoginError(null)}
            />
            <EditProfileModal
              isOpen={isEditOpen}
              onClose={() => setEditOpen(false)}
              onUpdate={handleUpdateProfile}
              isLoading={busy}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </HashRouter>
  );
}

export default App;
