const baseUrl = "http://localhost:3001/items";

// GET /items
export const getClothingItems = () => {
  return fetch(baseUrl).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
};

// POST /items
export const addClothingItem = ({ name, link, weather }) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link, weather }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
};

export const deleteClothingItem = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res;
  });
};
