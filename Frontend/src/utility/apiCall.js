import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // Enable sending cookies with requests
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);

// Add profile API call
export const getUserProfile = () => api.get('/auth/profile');
