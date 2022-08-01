import axiosClient from "./axiosClient";

const userService = {
  getAllUsers: (location) => {
    return axiosClient.get(`/api/user/getAll/${location}`);
  },
  searchUser: (location, content) => {
    return axiosClient.get(`/api/user/search/${location}/${content}`);
  },

  createUser: (params) => {
    return axiosClient.post("/api/user/register", params);
  },
  changePassword: (params) => {
    return axiosClient.post(`/api/user/changePassword`, params);
  }
};

export default userService;
