import axios from 'axios'

const baseURL = import.meta.env.VITE_URL;

const API = axios.create({
    baseURL,
})

export default API;