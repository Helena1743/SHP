import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user from saved token on app load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            setLoading(false);
            return;
        }

        axios
            .get(`${API_BASE}/user/me`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
                withCredentials: false,
            })
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(() => {
                logout();
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
};
