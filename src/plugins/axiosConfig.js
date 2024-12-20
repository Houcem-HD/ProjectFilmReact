// axiosConfig.js
import axios from "axios";

// Set the base URL for your API
axios.defaults.baseURL = "http://localhost:5259"; 

// Get the token from localStorage if it exists and set the Authorization header
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axios;
