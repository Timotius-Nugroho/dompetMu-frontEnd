import axios from "axios";

const axiosApiIntances = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export default axiosApiIntances;
