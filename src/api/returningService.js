import axiosClient from "./axiosClient";

const returningService = {
  getAllReturning: (location) => {
    return axiosClient.get(`/api/return/${location}`);
  },
  createNewReturning: (assId, requestBy) => {
    return axiosClient.post(`/api/return/${assId}/${requestBy}`);
  },
  searchReturning: (location, content) => {
    return axiosClient.get(`/api/return/search/${location}/${content}`);
  },
  completeRequest : (returnId, acceptedBy) => {
    return axiosClient.patch(`/api/return/${returnId}/${acceptedBy}`)
  },
  deleteReturning: (returnId) => {
    return axiosClient.delete(`/api/return/${returnId}`);
  }
};

export default returningService;
