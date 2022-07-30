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
  }
};

export default assetService;
