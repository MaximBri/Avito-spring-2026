import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

export const apiV2 = axios.create({
  baseURL: import.meta.env.VITE_OLAMA_URL,
})
