import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadi-forum-backend-xz8j.onrender.com/api",
});

export default axiosBase;
