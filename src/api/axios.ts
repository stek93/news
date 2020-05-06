import axios, { AxiosInstance } from 'axios';
import { AppRoutes } from "../constants/AppRoutes";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const instance: AxiosInstance = axios.create({
    baseURL: AppRoutes.BaseUrl,
    params: {
        apiKey: API_KEY
    }
});

export default instance;