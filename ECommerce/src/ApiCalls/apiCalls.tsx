import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchProductDetails = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};