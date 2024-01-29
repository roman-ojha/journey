import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
