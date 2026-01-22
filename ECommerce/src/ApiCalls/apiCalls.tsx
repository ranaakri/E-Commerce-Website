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
  },
);

export const fetchProducts = async () => {
  const value = document.cookie
    .split(";")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (value === "xyz") {
    const response = await api.get("/products");
    console.log("api call");
    return response.data;
  }else{
    console.error("Unauthorized")
    throw Error("UnAuthorised")
  }
};

export const fetchProductDetails = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
