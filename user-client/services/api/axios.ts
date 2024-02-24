import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "@/lib/getCookie";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const request = ({ ...options }: AxiosRequestConfig) => {
  client.defaults.headers.common["Authorization"] = getCookie("UserAuthToken");
  return client(options);
};
