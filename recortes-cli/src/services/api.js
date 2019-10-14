
import axios from "axios";
import { getToken } from "./auth";


const hostname = window.location.hostname;
const api = axios.create({

    baseURL: `http://${hostname}:8001`
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

export default api;
