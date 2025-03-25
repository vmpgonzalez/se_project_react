import { APIkey, location } from "./constants";

const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${APIkey}`;

// Fetch weather data
export const getWeatherData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const city = data.name;

    return {
      temperature,
      city,
      weatherType: defineWeatherType(temperature),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export const defineWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
