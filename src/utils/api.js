const baseUrl = "http://localhost:3001/items";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getClothingItems = () => {
  return fetch(baseUrl).then(checkResponse);
};

export const addClothingItem = ({ name, link, weather }) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link, weather }),
  }).then(checkResponse);
};

export const deleteClothingItem = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};
