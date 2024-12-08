import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_MA_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
});
