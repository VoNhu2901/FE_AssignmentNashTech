import axiosClient from "./axiosClient";

const assetService = {
  getAllAssets: (location) => {
    return axiosClient.get(`/api/asset/getAll/${location}`);
  },
  searchAsset: (location, content) => {
    return axiosClient.get(`/api/asset/search/${location}/${content}`);
  },
};

export default assetService;
