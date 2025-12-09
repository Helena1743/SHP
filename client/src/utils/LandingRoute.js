import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

const LandingRoute = () => {
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

  // Prevent UI from rendering before checking cookie
  if (loading) return <div />;

  // Not logged in → go to login
  if (!user) return <Navigate to="/login" />;

  // Redirect user by role
  if (user.role === "standard_user") return <Navigate to="/user-landing" />;
  if (user.role === "merchant") return <Navigate to="/merchant-landing" />;
  if (user.role === "admin") return <Navigate to="/admin-dashboard" />;

  // Fallback
  return <Navigate to="/login" />;
};

export default LandingRoute;
