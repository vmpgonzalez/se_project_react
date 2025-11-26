# WTWR - What to Wear 🌤️🧥

A full-stack weather-based clothing recommendation app

**WTWR (What to Wear)** is a front-end React application that integrates with a custom Express + MongoDB backend. The app provides clothing suggestions based on live weather data, allows users to register and log in, create their own clothing items, like/dislike items, and remove their own items.

This project was completed as part of the TripleTen Software Engineering Program.

---

## 📌 Features

### 🌦️ Weather + Recommendations

- Live weather data from **OpenWeather API**
- Weather-based clothing suggestions: **hot**, **warm**, **cold**
- Dynamic WeatherCard backgrounds (sunny, cloudy, rainy, etc.)
- Temperature toggle (°F / °C)

### 👤 User Accounts

- Register, login, logout
- Secure token storage via **localStorage**
- Protected routes and user-specific UI
- Profile editing with persistent user data

### 👕 Clothing Items

- Add new clothing items with category + image
- View full details in item modal
- Like / unlike clothing items (authenticated users only)
- Delete only your own items
- Real-time UI updates based on user identity
- Like button **hidden** when logged out

### 🧰 UI / UX

- ESC key, overlay click, and close button logic for all modals

---

## 🛠️ Tech Stack

### **Frontend**

- React + Vite
- React Router
- Context API
- Custom API utilities + single `checkResponse` validator
- CSS modules + custom styling

### **Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- User routes, auth routes, and clothing item routes

---

## 🗄️ Backend Repository (Required)

👉 **Backend Repo:**  
https://github.com/vmpgonzalez/se_project_express

---

## 🌐 Live Demo

👉 **Deployed Frontend:**  
https://vmpgonzalez.github.io/se_project_react/
