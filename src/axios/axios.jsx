import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://polling-app-server-production.up.railway.app',
    // baseURL: 'http://localhost:8001',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})


axiosInstance.interceptors.request.use(
    (config) => {
        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },

    (error) => {
        return Promise.reject(error)
    }
)