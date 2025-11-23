// src/utils/api.js
import { API_BASE_URL } from "./config";

const handleJSON = async (res) => {
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message || `HTTP ${res.status}`);
  }
  return res.json();
};

// ---------- PUBLIC ----------
export const getClothingItems = () =>
  fetch(`${API_BASE_URL}/items`).then(handleJSON);

// ---------- PROTECTED (send token) ----------
export const addClothingItem = (data, token) =>
  fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data), // expect { name, imageUrl, weather }
  }).then(handleJSON);

export const deleteClothingItem = (id, token) =>
  fetch(`${API_BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => (res.ok ? true : handleJSON(res)));

export const addCardLike = (id, token) =>
  fetch(`${API_BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: { authorization: `Bearer ${token}` },
  }).then(handleJSON);

export const removeCardLike = (id, token) =>
  fetch(`${API_BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then(handleJSON);

export const updateUser = ({ name, avatar }, token) =>
  fetch(`${API_BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleJSON);
