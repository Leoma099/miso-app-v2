import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: 'http://api.miso-backend.loc/api', // Replace with your Laravel API URL
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

// Add a request interceptor to include the token in every request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token'); // Get the token from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
});

export default apiClient;