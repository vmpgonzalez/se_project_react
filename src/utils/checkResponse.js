// src/utils/checkResponse.js
export const checkResponse = (res) => {
  if (!res.ok) {
    return res
      .json()
      .catch(() => ({}))
      .then((err) => {
        throw new Error(err.message || `HTTP ${res.status}`);
      });
  }
  return res.json();
};
