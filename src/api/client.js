import { getToken } from "./auth";
import axios from "axios";

function getApiBase() {
    if (window.location.hostname === "localhost") {
        return "http://localhost:3000/api"
    }
    return "https://web-production-86b9b1.up.railway.app/api"
}

const API_URL = getApiBase()

const api = axios.create({
    baseURL: API_URL, 
    headers: {"Content-Type": "application/json"}
})

axios.interceptors.request.use((config) => {
    const token = getToken()

    if (token) {
        config.headers.Authorization = $`Bearer ${token}`
    }

    return config
}, (error) => {})


export default api