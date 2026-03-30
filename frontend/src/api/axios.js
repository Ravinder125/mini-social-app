import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL

const API = axios.create({
    baseURL: baseUrl,
})

API.interceptors.request.use((req) => {
    const user = localStorage.getItem("user");

    if (user) {
        const token = JSON.parse(user).token;
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})

export default API