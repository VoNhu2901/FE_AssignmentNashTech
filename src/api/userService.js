import axiosClient from "./axiosClient";

const userService = {
  getAllUsers: (location, raw) => {
    return axiosClient.get(`/api/user/getAll/${location}/${raw}`);
  },
  searchUser: (location, content) => {
    return axiosClient.get(`/api/user/search/${location}/${content}`);
  },
};

export default userService;
