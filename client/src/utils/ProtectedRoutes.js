import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const ProtectedRoutes = ({ role }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/user/me`, {
      method: "GET",
      credentials: "include",
    })
      .then(async response => {
        if (!response.ok) {
          // Not authenticated → force logout
          setUser(null);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return null; // prevent flicker

  if (!user) return <Navigate to="/login" />;

  // Only allow access if role matches
  return user.role === role ? <Outlet /> : <Navigate to="/landing" />;
};

export default ProtectedRoutes;
