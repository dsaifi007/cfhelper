import axios from "axios";
import { getAuthEmail, getToken } from "./constant";

const axiosInstance = axios.create({
  baseURL: "https://backend.cfhelper.com/api/",//process.env.NEXT_PUBLIC_API_BASE_URL, // "http://127.0.0.1:8001/api/"
  timeout: 100000,
  // headers: {
  //   "X-Auth-Email": getAuthEmail(),
  //   "X-Auth-Key": getToken()
  // },
});

// axiosInstance.interceptors.request.use(
//   (config: any) => {

//     config.headers["X-Auth-Email"] = getAuthEmail();// process.env.NEXT_PUBLIC_EMAIL;
//     config.headers["X-Auth-Key"] = getToken(); //process.env.NEXT_PUBLIC_AUTH_KEY;

//     // config.headers["Accept-Language"] = `${language}`;

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (config: any) => {
//     return config;
//   },
//   (error) => {
//     if (
//       error.response.message === "Invalid Token." ||
//       error.response.status === 401
//     ) {
//       sessionStorage.clear();
//       localStorage.clear();
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );
export default axiosInstance;
