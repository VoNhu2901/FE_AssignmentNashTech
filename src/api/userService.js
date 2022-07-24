import axiosClient from "./AxiosClient";

const userService = {
  getAllUsers: (location) => {
    return axiosClient.get(`/api/user/getAll/${location}`);
  }
};

export default userService;