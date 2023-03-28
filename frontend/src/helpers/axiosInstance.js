import axios from "axios";

const user = localStorage.getItem("user");

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
});
