import axiosClient from "./axiosClient.js";

const userService = {
  getAllUsers: (location) => {
    return axiosClient.get(`/api/user/getAll/${location}`);
  }
};

export default userService;