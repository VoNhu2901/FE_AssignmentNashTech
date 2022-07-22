import axios from "axios";

export const getAllUserSameLocation = (location) => {
  return axios({
    headers: {
      "content-type": "application/json",
    },
    url: `http://localhost:8080/user/getAll/${location}`,
    method: "GET",
  });
};
