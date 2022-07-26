import axiosClient from "./axiosClient";

const userService = {
  getAllUsers: (location) => {
    return axiosClient.get(`/api/user/getAll/${location}`);
  },
  searchUser: (location, content) => {
    return axiosClient.get(`/api/user/search/${location}/${content}`);
  },
};

export default userService;
