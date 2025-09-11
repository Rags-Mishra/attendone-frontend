// src/lib/axios.ts
import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true, // send cookies too
});


export default api;
