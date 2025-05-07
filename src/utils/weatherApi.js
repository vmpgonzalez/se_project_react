import { APIkey, location } from "./constants";

const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${APIkey}`;

export const getWeatherData = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  const data = await response.json();

  const temperature = Math.round(data.main.temp);
  const city = data.name;
  const weatherCondition = data.weather[0].main;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;

  return {
    temperature,
    city,
    weatherCondition,
    sunrise,
    sunset,
    weatherType: defineWeatherType(temperature),
  };
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
