import axiosClient from "./axiosClient";

const assetService = {
  getAllAssets: (location) => {
    return axiosClient.get(`/api/asset/getAll/${location}`);
  },
  searchAsset: (location, content) => {
    return axiosClient.get(`/api/asset/search/${location}/${content}`);
  },
  disableAsset: (id) => {
    return axiosClient.delete(`/api/asset/delete/${id}`);
  },
  createAsset: (params) => {
    return axiosClient.post(`/api/asset`, params);
  },
  editAsset: (id, params) => {
    return axiosClient.put(`/api/asset/${id}`, params);
  },
  deleteAsset: (id) => {
    return axiosClient.delete(`/api/asset/${id}`);
  },
  getAssetById: (id) => {
    return axiosClient.get(`/api/asset/${id}`);
  }
};

export default assetService;
