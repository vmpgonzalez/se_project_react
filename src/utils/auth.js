// utils/auth.js (or wherever this lives)
import { API_BASE_URL } from "./config";

const handleJSON = async (res) => {
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status; // <-- add status
    err.payload = data; // <-- optional: pass server body
    throw err;
  }

  return data;
};

export const signup = ({ name, avatar, email, password }) =>
  fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleJSON);

export const signin = ({ email, password }) =>
  fetch(`${API_BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleJSON);

export const checkToken = (token) =>
  fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleJSON);
