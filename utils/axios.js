import axios from "axios";
import Cookie from "js-cookie";

const axiosApiIntances = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
// console.log("BACKEND URL", process.env.NEXT_PUBLIC_BACKEND_URL);

axiosApiIntances.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: `Bearer ${Cookie.get("token")}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApiIntances.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      Cookie.remove("token");
      Cookie.remove("user");
      alert("Please log in !");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosApiIntances;
