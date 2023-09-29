import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
        config.headers['Authorization'] = token;
        return config
    }
)

axiosInstance.interceptors.response.use(
    response => {
        const token = response.data.token;
        if(token === 'loggedOut'){
            localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME)
        } else if(token){
            localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, token)
        }
        return response;
    }
)

export default axiosInstance;