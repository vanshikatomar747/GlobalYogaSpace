import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const SocialAuthHandler = () => {
    const [searchParams] = useSearchParams();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserAndRedirect = async () => {
            const token = searchParams.get("token");
            if (token) {
                localStorage.setItem("token", token);
                try {
                    // Fetch user details
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    const { data } = await axios.get(`${API_URL}/api/auth/me`, config);

                    localStorage.setItem("user", JSON.stringify(data));
                    navigate("/");
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    navigate("/auth?error=auth_failed");
                }
            } else {
                navigate("/auth");
            }
        };

        fetchUserAndRedirect();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream-main">
            <div className="text-xl font-bold text-green-main animate-pulse">
                Processing Login...
            </div>
        </div>
    );
};

export default SocialAuthHandler;
