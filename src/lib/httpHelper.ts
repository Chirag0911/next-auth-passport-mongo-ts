"use client";

import { toast } from "react-toastify";

export function responseHelper(response: any) {
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
  return null;
}

export function axiosConfig(config: any) {
  const token = localStorage.getItem("access_token");

  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers["Accept-Language"] = "en";
  return config;
}

export function errorHelper(error: any) {
  if (error.config.url.includes("/auth/verify")) {
    return;
  }

  if (error.response.data.message) {
    toast.error(error.response.data.message);
  }
}
