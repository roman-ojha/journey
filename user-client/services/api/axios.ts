import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
