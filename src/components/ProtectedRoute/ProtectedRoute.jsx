// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// component: route guard
export default function ProtectedRoute({ isLoggedIn, isAuthReady, children }) {
  // guard: wait for auth check
  if (!isAuthReady) return null;

  // logic: allow or redirect
  return isLoggedIn ? children : <Navigate to="/" replace />;
}
