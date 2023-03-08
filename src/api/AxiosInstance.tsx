import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: `https://5f55a98f39221c00167fb11a.mockapi.io/`,
  headers: {
    "Content-Type": "application/json",
  },
});
