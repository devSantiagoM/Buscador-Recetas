import axios from "axios"

console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.themealdb.com/api/json/v1/1",
  timeout: 8000, // 8 segundos
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Aquí puedes personalizar el manejo de errores global
    console.error("Error en petición axios:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      baseURL: error.config?.baseURL
    });
    return Promise.reject(error);
  }
)

export default axiosInstance; 