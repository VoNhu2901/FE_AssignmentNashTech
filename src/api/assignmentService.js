import axiosClient from "./axiosClient";

const assignmentService = {
  getAllAssignments: (location) => {
    return axiosClient.get(`/api/assignment/getAll/${location}`);
  },
  getAllAssetsByAvailable: (location) => {
    return axiosClient.get(`/api/assignment/getAsset/${location}`);
  },
  searchAssignment: (location, content) => {
    return axiosClient.get(`/api/assignment/search/${location}/${content}`);
  },
  // disableAssignment: (id) => {
  //   return axiosClient.delete(`/api/assignment/delete/${id}`);
  // },
  createAssignment: (params) => {
    return axiosClient.post(`/api/assignment`, params);
  },
  editAssignment: (id, params) => {
    return axiosClient.put(`/api/assignment/edit/${id}`, params);
  },
  deleteAssignment: (id) => {
    return axiosClient.delete(`/api/assignment/disable/${id}`);
  },
  getAssignmentById: (id) => {
    return axiosClient.get(`/api/assignment/getAssignment/${id}`);
  },
  searchAssetByAvailable: (location, content) => {
    return axiosClient.get(
      `/api/assignment/searchAsset/${location}/${content}`
    );
  },
};

export default assignmentService;
