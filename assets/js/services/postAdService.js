import config from "config";
import { authHeader } from "../helpers";

export const postAdService = {
  listCarBrands,
  listCarModels,
  listCarVariants,
  postAd,
  getActiveAdById,
  listActiveAds,
  getAdById,
  listAds,
  deleteAd,
  updateAd,

};

function listCarBrands(type) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(
    `${config.apiUrl}/api/v1/car_attributes/brands/${type}`,
    requestOptions
  ).then(handleResponse);
}

function listCarModels(type, brand) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(
    `${config.apiUrl}/api/v1/car_attributes/models/${type}/${brand}`,
    requestOptions
  ).then(handleResponse);
}

function listCarVariants(type, brand, model) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(
    `${config.apiUrl}/api/v1/car_attributes/variants/${type}/${brand}/${model}`,
    requestOptions
  ).then(handleResponse);
}

function postAd(ad) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(ad),
  };

  return fetch(`${config.apiUrl}/api/v1/post_ad`, requestOptions).then(
    handleResponse
  );
}

function getActiveAdById(ad_id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(
    `${config.apiUrl}/api/v1/listings/active/${ad_id}`,
    requestOptions
  ).then(handleResponse);
}

function listActiveAds() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${config.apiUrl}/api/v1/listings/active`, requestOptions).then(
    handleResponse
  );
}

function getAdById(ad_id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/api/v1/listings/${ad_id}`, requestOptions).then(
    handleResponse
  );
}

function listAds() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/api/v1/ads`, requestOptions).then(
    handleResponse
  );
}
function updateAd(ad_id, details) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ad: details})
    };

    return fetch(`${config.apiUrl}/api/v1/listings/${ad_id}/update`, requestOptions).then(handleResponse);;
}

function deleteAd(ad_id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/api/v1/listings/${ad_id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    console.log("http response response ======", data);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      } else if (response.status === 422) {
        console.log("data fields error");
        const error = (data && data.errors) || response.statusText;
        console.log("data fields error", data.errors);
        var errorMsg =
          Object.keys(data.errors)[0] +
          " " +
          data.errors[Object.keys(data.errors)[0]][0];
        return Promise.reject(errorMsg);
      }
    }
    return data;
  });
}
