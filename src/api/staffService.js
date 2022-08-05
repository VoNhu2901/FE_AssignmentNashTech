import axiosClient from "./axiosClient";

const staffService = {
    getListAssignments: () => {
        return axiosClient.get(`/api/staff/assignments`);
    },
    getAssignmentById: (id) => {
        return axiosClient.get(`/api/staff/assignments/${id}`);
    },
    updateStateAssignment: (id, params) => {
        return axiosClient.patch(`/api/staff/assignments/${id}/`, params);
    }
}
export default staffService;