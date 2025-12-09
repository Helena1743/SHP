import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../utils/UserContext";

export default function Login() {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async (email, password) => {
        try {
            const res = await axios.post(`${API_BASE}/login`, {
                email,
                password,
            });

            const token = res.data.access_token;
            const userData = res.data.user;

            // Save token
            localStorage.setItem("token", token);

            // Update context
            setUser(userData);

            // Go to landing ONCE
            navigate("/landing", { replace: true });
        } catch (err) {
            setError("Invalid login credentials");
        }
    };

    return (
        <LoginForm onLogin={handleLogin} error={error} />
    );
}
