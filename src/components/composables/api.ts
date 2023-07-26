import axios from "axios";

// Create a new instance of Axios
const api = axios.create({
  baseURL: "https://abasan-kab-api-e1f9d4eb0af2.herokuapp.com/api",
});

// Request interceptor
api.interceptors.request.use((config) => {
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Modify the response object if needed
    return response;
  },
  (error) => {
    // Handle any error responses
    return Promise.reject(error);
  }
);

export default api;
