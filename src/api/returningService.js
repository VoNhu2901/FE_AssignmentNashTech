import axiosClient from "./axiosClient";

const returningService = {
  getAllReturning: (location) => {
    return axiosClient.get(`/api/return/${location}`);
  },
  createNewReturning: (assId) => {
    return axiosClient.post(`/api/return/${assId}`);
  },
  searchReturning: (location, content) => {
    return axiosClient.get(`/api/return/search/${location}/${content}`);
  },
  completeRequest: (returnId) => {
    return axiosClient.patch(`/api/return/${returnId}`);
  },
  deleteReturning: (returnId) => {
    return axiosClient.delete(`/api/return/${returnId}`);
  },
};

export default returningService;
