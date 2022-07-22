import axiosClient from "./axiosClient";

const userService = {
  getAllUsers: (location) => {
    return axiosClient.get(`/user/getAll/${location}`);
  }
};

export default userService;