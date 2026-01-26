import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // 👈 cookies de sesión
  headers: {
    Accept: "application/json",
    'X-Requested-With': 'XMLHttpRequest',
  },
    withXSRFToken: true
});

const apiPago = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export {api, apiPago};