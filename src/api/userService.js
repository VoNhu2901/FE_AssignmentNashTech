import axiosClient from "./axiosClient";

const userService = {
  getAllUsers: (location) => {
    return axiosClient.get(`/api/user/getAll/${location}`);
  },

  getUserByStaffCode: (staffCode) => {
    return axiosClient.get(`/api/user/getInformation/${staffCode}`);
  },
  searchUser: (location, content) => {
    return axiosClient.get(`/api/user/search/${location}/${content}`);
  },

  createUser: (params) => {
    return axiosClient.post("/api/user/register", params);
  },

  editUser: (staffCode, params) => {
    return axiosClient.put(`/api/user/edit/${staffCode}`, params);
  },

  checkUserCanDelete: (staffCode) => {
    return axiosClient.get(`/api/user/check/${staffCode}`);
  },

  disableUser: (staffCode) => {
    return axiosClient.patch(`/api/user/disable/${staffCode}`);
  },

  changePassword: (params) => {
    return axiosClient.post(`/api/user/changePassword`, params);
  },
};

export default userService;
