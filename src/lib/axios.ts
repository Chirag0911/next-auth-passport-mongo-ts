import axios from "axios";
import { responseHelper, axiosConfig, errorHelper } from "@/lib/httpHelper";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers,
});

instance.interceptors.request.use(axiosConfig);
instance.interceptors.response.use(responseHelper, errorHelper);

export default instance;
