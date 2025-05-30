import { APIkey, location } from "./constants";

const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${APIkey}`;

export const getWeatherData = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  const data = await response.json();

  const temperatureF = Math.round(data.main.temp);
  const temperatureC = Math.round((temperatureF - 32) * (5 / 9));
  const city = data.name;
  const weatherCondition = data.weather[0].main;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;

  return {
    temperature: {
      F: temperatureF,
      C: temperatureC,
    },
    city,
    weatherCondition,
    sunrise,
    sunset,
    weatherType: defineWeatherType(temperatureF),
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
