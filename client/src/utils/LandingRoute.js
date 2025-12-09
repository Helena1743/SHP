import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

const LandingRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // No token → user not logged in
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          setUser(null);
          return;
        }
        const data = await response.json();
        setUser(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Still checking user
  if (loading) return <div>Loading...</div>;

  // No user → go to login
  if (!user) return <Navigate to="/login" replace />;

  // Route based on role
  if (user.role === "standard_user")
    return <Navigate to="/user-landing" replace />;

  if (user.role === "merchant")
    return <Navigate to="/merchant-landing" replace />;

  if (user.role === "admin")
    return <Navigate to="/admin-dashboard" replace />;

  // Unknown role → send back to login
  return <Navigate to="/login" replace />;
};

export default LandingRoute;
