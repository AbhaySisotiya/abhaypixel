import axios from "axios";

const api_url = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
    baseURL:api_url,
    withCredentials:true,
});


export default api;

