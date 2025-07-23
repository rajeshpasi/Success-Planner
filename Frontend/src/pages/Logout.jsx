import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// This component handles user logout by calling the backend logout API,
// clearing authentication data, and redirecting to the login page.

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                // Call backend logout API (update the URL as per your backend route)
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
            } catch (error) {
                // Optionally handle error (e.g., log or show message)
                console.error('Logout error:', error);
            } finally {
                // Clear user authentication (example: remove token from localStorage)
                localStorage.removeItem('token');
                // Redirect to login page
                navigate('/login');
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div>Logging out...</div>
    );
};

export default Logout;