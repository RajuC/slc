import { authHeader } from "../helpers/authHeader";

import axios from "../helpers/axios";
export const apiService = {
  getLatLong,
  listCarBrands,
  listCarModels,
  listCarVariants,
  listUsers,
  postAd,
  listAllAds,
  getAdById,
  listActiveAds,
  getActiveAdById,
  deleteAdById,
  updateAdById,
  getUserById
};

function getLatLong(place_id) {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=AIzaSyA-SvePR8DwM531CEbfJAipwszxCJwdvXk`);
}

function listCarBrands(type) {
  return axios.get(`/car_attributes/brands/${type}`);
}

function listCarModels(type, brand) {
  return axios.get(`/car_attributes/models/${type}/${brand}`);
}

function listCarVariants(type, brand, model) {
  return axios.get(`/car_attributes/variants/${type}/${brand}/${model}`);
}

function listUsers() {
  return axios.get("/users", {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}

function postAd(ad) {
  return axios.post("/post_ad", ad, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}

function listAllAds() {
  return axios.get("/listings", {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}

function getAdById(ad_id) {
  return axios.get(`/listings/${ad_id}`, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}

function listActiveAds() {
  return axios.get("/listings/active", {
    headers: { "Content-Type": "application/json" },
  });
}

function getActiveAdById(ad_id) {
  return axios.get(`/listings/active/${ad_id}`, {
    headers: { "Content-Type": "application/json" },
  });
}

function deleteAdById(ad_id) {
  return axios.delete(`/listings/${ad_id}`, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}

function updateAdById(ad_id, ad) {
  return axios.post(`/listings/${ad_id}`, ad, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}


function getUserById(user_id) {
  return axios.get(`/users/${user_id}`, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}