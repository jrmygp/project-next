import axios from 'axios'

export const API_URL = "http://localhost:2020";

export const axiosInstance = axios.create({
  baseURL: API_URL
})
