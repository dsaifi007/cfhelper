import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 100000,
  headers: {
    "Authorization": 'Bearer ' || "",
    //authorization: import.meta.env.VITE_AUTHORIZATION_KEY,
  },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const user = 'Bearer ';
    const language = "en";

    if (user) {
      config.headers["Authorization"] = `${user}`;
    }
    config.headers["Accept-Language"] = `${language}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config: any) => {
    return config;
  },
  (error) => {
    if (
      error.response.message === "Invalid Token." ||
      error.response.status === 401
    ) {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
