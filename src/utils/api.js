// src/utils/api.js
import { API_BASE_URL } from "./config";
import { checkResponse } from "./checkResponse";

// ---------- PUBLIC ----------
export const getClothingItems = () =>
  fetch(`${API_BASE_URL}/items`).then(checkResponse);

// ---------- PROTECTED ----------
export const addClothingItem = (data, token) =>
  fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(checkResponse);

export const deleteClothingItem = (id, token) =>
  fetch(`${API_BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => {
    if (res.ok) return true;
    return checkResponse(res);
  });

export const addCardLike = (id, token) =>
  fetch(`${API_BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: { authorization: `Bearer ${token}` },
  }).then(checkResponse);

export const removeCardLike = (id, token) =>
  fetch(`${API_BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then(checkResponse);

export const updateUser = ({ name, avatar }, token) =>
  fetch(`${API_BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
