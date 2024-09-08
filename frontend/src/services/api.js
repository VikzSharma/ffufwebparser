import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',  // Ensure this matches your backend URL
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default api;
