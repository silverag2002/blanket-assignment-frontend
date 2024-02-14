import axios from "axios";
import { AuthTokenHandler } from "./auth-token.util";

const AxiosInstance = axios.create({});
AxiosInstance.interceptors.request.use((req) => {
  const accessToken = AuthTokenHandler.getAccessToken();

  req.headers.Authorization = `Bearer ${accessToken || ""}`;

  return req;
});

export const axiosInstance = AxiosInstance;
