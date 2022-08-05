import axiosClient from "./axiosClient";

const assignmentService = {
  getAllAssignments: (location) => {
    return axiosClient.get(`/api/assignment/getAll/${location}`);
  },
  searchAssignment: (location, content) => {
    return axiosClient.get(`/api/assignment/search/${location}/${content}`);
  },
  // disableAssignment: (id) => {
  //   return axiosClient.delete(`/api/assignment/delete/${id}`);
  // },
  createAssignment: (assignedby, params) => {
    return axiosClient.post(
      `/api/assignment/createAssign/${assignedby}`,
      params
    );
  },
  editAssignment: (id, params) => {
    return axiosClient.put(`/api/assignment/edit/${id}`, params);
  },
  deleteAssignment: (id) => {
    return axiosClient.delete(`/api/assignment/${id}`);
  },
  getAssignmentById: (id) => {
    return axiosClient.get(`/api/assignment/${id}`);
  },
};

export default assignmentService;
