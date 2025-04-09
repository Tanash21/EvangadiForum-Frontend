import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadiforumbackend-2ooj.onrender.com/api",
});

export default axiosBase;
