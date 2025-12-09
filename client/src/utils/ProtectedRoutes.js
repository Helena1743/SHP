import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

const ProtectedRoutes = ({ role }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/user/me`, {
      method: "GET",
      credentials: "include"
    })
      .then(async (response) => {
        if (!response.ok) {
          setUser(null);
        } else {
          const data = await response.json();
          setUser(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  // Prevent UI from crashing during load
  if (loading) return <div />;

  // If no user, go back to login
  if (!user) return <Navigate to="/login" />;

  // Allow access only if role matches
  return user.role === role ? <Outlet /> : <Navigate to="/landing" />;
};

export default ProtectedRoutes;
