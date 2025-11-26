// src/utils/auth.js
import { API_BASE_URL } from "./config";
import { checkResponse } from "./checkResponse";

// Sign up
export const signup = ({ name, avatar, email, password }) =>
  fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);

// Sign in
export const signin = ({ email, password }) =>
  fetch(`${API_BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

// Validate token and load user data
export const checkToken = (token) =>
  fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
