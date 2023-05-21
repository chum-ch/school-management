import axios from "axios";

// Config default api and accept header

export default axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
      "Content-type": "application/json"
    }
  });
