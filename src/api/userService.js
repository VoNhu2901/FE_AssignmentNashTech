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

  checkUserCanDelete: (staffCode) => {
    return axiosClient.get(`/api/user/check/${staffCode}`);
  },

  disableUser: (staffCode) => {
    return axiosClient.patch(`/api/user/disable/${staffCode}`)
  }
};

export default userService;
