import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "@/lib/cookie";
import { AUTH_USER_COOKIE_NAME } from "@/data/constants";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const request = ({ ...options }: AxiosRequestConfig) => {
  client.defaults.headers.common["Authorization"] = getCookie(
    AUTH_USER_COOKIE_NAME
  );
  return client(options);
};
