import axios from "axios";

import config from "config";

// const user = JSON.parse(localStorage.getItem("slc_user"));

const axiosInstance = axios.create({
  baseURL: `${config.apiUrl}/api/v1`,
  timeout: 2000,
});

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default axiosInstance;

const errorHandler = (error) => {
  status = error.response.status;
  if (status == 404) {
    console.log(
      "(axios errorHandler)========================== 404 error",
      error.response.data
    );
    return error.response.data;
  }
  if (status == 401) {
    console.log(
      "(axios errorHandler)========================== 401 error",
      error.response.data
    );
    return error.response.data;
  }
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  console.log(
    "(axios successHandler)========================== response",
    response.data
  );
  return response.data;
};
