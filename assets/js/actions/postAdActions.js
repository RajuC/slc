import { postAdConstants } from "../constants/postAdConstants";
// import { postAdService } from "../services/postAdService";
import { alertActions } from "./alertActions";
import { history } from "../helpers";
import { apiService } from "../services/apiService";

export const postAdActions = {
  addEditListing,
  addAskingPrice,
  addSellerNotes,
  addSellerPhNum,
  addSellerEmail,
  addSellerName,
  addVehicleType,
  // addVehicleDetails,
  addVehicleFeature,
  removeVehicleFeature,
  addVehicleLocation,
  addVehicleImages,
  // deleteVehicleImage,
  addPostId,
  addPostValidations,
  addVehicleBrand,
  addVehicleModel,
  addVehicleVariant,
  addVehicleYear,
  addVehicleCondition,
  addVehicleFuelType,
  addVehicleKmDriven,
  addVehicleBodyType,
  addVehicleTransmission,
  addVehicleNoOfOwners,
  submitAdDetails,
  updateAdDetails,
};

function updateAdDetails(adDetails, path) {
  console.log(
    "(updateAdDetails)========================== updateAdDetails",
    adDetails,
    path
  );
  return (dispatch) => {
    dispatch(request(adDetails));

    const updateAd = async () => {
      try {
        const response = await apiService.updateAd(adDetails);
        dispatch(success(response.data.id));
        console.log("Post Ad success", response.data.id);
        history.push(path);
        dispatch(
          alertActions.success(
            "Your Ad updated successfully reference id" + response.data.id
          )
        );
      } catch (err) {
        console.error(err);
        dispatch(failure(err));
        dispatch(alertActions.error(err));
      }
    };

    updateAd();

  };

  function request(adDetails) {
    return { type: postAdConstants.UPDATE_AD_REQUEST, adDetails };
  }
  function success(adDetails) {
    return { type: postAdConstants.UPDATE_AD_SUCCESS, adDetails };
  }
  function failure(error) {
    return { type: postAdConstants.UPDATE_AD_FAILURE, error };
  }
}

function submitAdDetails(ad, path) {
  console.log(
    "(postAdActions)========================== postAdDetails",
    ad,
    path
  );
  return (dispatch) => {
    dispatch(request(ad));

    const submitAd = async () => {
      try {
        const response = await apiService.postAd(ad);
        dispatch(success(response.data.id));
        console.log("Post Ad success", response.data.id);
        history.push(path);
        dispatch(
          alertActions.success(
            "Your Ad posted successfully reference id" + response.data.id
          )
        );
      } catch (err) {
        console.error(err);
        dispatch(failure(err));
        dispatch(alertActions.error(err));
      }
    };

    submitAd();

    // try {
    //   const response = apiService.postAd(ad);
    //   console.log("(fileName)========================== postAd response", response.data );
    //   dispatch(success(response.data.id));
    //   console.log("Post Ad success", response.data.id);
    //   history.push(path);
    //             dispatch(alertActions.success('Your Ad posted successfully reference id' + response.data.id));
    // } catch (err) {
    //   console.error(err);
    //   dispatch(failure(err));
    //   dispatch(alertActions.error(err));
    // }

    // postAdService.postAd(ad)
    //     .then(
    //         ad => {
    //             dispatch(success(ad.data.id));
    //             console.log("Post Ad success", ad.data.id);
    //             history.push(path);
    //             dispatch(alertActions.success('Your Ad posted successfully reference id' + ad.data.id));
    //         },
    //         error => {
    //             console.log("error", error);
    //             dispatch(failure(error));
    //             dispatch(alertActions.error(error));
    //             // history.push("/");
    //         }
    //     );
  };

  function request(ad) {
    return { type: postAdConstants.POST_AD_REQUEST, ad };
  }
  function success(ad) {
    return { type: postAdConstants.POST_AD_SUCCESS, ad };
  }
  function failure(error) {
    return { type: postAdConstants.POST_AD_FAILURE, error };
  }
}

function addEditListing(key, listingDetails) {
  return { type: postAdConstants.ADD_EDIT_LISTING, key, listingDetails };
}

function addVehicleFeature(vehicleFeature) {
  return { type: postAdConstants.ADD_VEHICLE_FEATURE, vehicleFeature };
}

function removeVehicleFeature(vehicleFeatureKey) {
  return { type: postAdConstants.REMOVE_VEHICLE_FEATURE, vehicleFeatureKey };
}

function addAskingPrice(askingPrice) {
  return { type: postAdConstants.ADD_VEHICLE_ASKING_PRICE, askingPrice };
}

function addSellerName(sellerName) {
  return { type: postAdConstants.ADD_VEHICLE_SELLER_NAME, sellerName };
}

function addSellerEmail(sellerEmail) {
  return { type: postAdConstants.ADD_VEHICLE_SELLER_EMAIL, sellerEmail };
}
function addSellerPhNum(sellerPhNum) {
  return { type: postAdConstants.ADD_VEHICLE_SELLER_PHONE_NUM, sellerPhNum };
}
function addSellerNotes(sellerNotes) {
  return { type: postAdConstants.ADD_VEHICLE_SELLER_NOTES, sellerNotes };
}

function addPostId(postId) {
  return { type: postAdConstants.ADD_POST_ID, postId };
}

function addVehicleType(vehicleType) {
  return { type: postAdConstants.ADD_VEHICLE_TYPE, vehicleType };
}

function addVehicleBrand(brand) {
  return { type: postAdConstants.ADD_VEHICLE_BRAND, brand };
}

function addVehicleModel(model) {
  return { type: postAdConstants.ADD_VEHICLE_MODEL, model };
}

function addVehicleVariant(variant) {
  return { type: postAdConstants.ADD_VEHICLE_VARIANT, variant };
}

function addVehicleYear(year) {
  return { type: postAdConstants.ADD_VEHICLE_YEAR, year };
}

function addVehicleCondition(condition) {
  return { type: postAdConstants.ADD_VEHICLE_CONDITION, condition };
}

function addVehicleFuelType(fuelType) {
  return { type: postAdConstants.ADD_VEHICLE_FUELTYPE, fuelType };
}

function addVehicleKmDriven(kmDriven) {
  return { type: postAdConstants.ADD_VEHICLE_KM_DRIVEN, kmDriven };
}

function addVehicleBodyType(bodyType) {
  return { type: postAdConstants.ADD_VEHICLE_BODY_TYPE, bodyType };
}

function addVehicleTransmission(transmission) {
  return { type: postAdConstants.ADD_VEHICLE_TRANSMISSION, transmission };
}

function addVehicleNoOfOwners(noOfOwners) {
  return { type: postAdConstants.ADD_VEHICLE_NO_OF_OWNERS, noOfOwners };
}

function addVehicleLocation(vehicleLocation) {
  return (dispatch) => {
    if (vehicleLocation.value) {
      const locWithLatLong = async () => {
        try {
          const respJson = await apiService.getLatLong(
            vehicleLocation.value.place_id
          );
          let latitude = respJson.results[0].geometry.location.lat;
          let longitude = respJson.results[0].geometry.location.lng;
          // console.log("locWithLatLongsuccess", respJson);
          let finalLocValue = {
            ...vehicleLocation.value,
            lat: latitude,
            long: longitude,
          };
          dispatch(done({ ...vehicleLocation, value: finalLocValue }));
        } catch (err) {
          console.error(err);
        }
      };

      locWithLatLong();
    } else {
      done(vehicleLocation);
    }
  };
  function done(vehicleLocation) {
    return { type: postAdConstants.ADD_VEHICLE_LOCATION, vehicleLocation };
  }
}

function addVehicleImages(vehicleImages) {
  return { type: postAdConstants.ADD_VEHICLE_IMAGES, vehicleImages };
}

// function deleteVehicleImage(vehicleImageRef) {
//   return { type: postAdConstants.DELETE_VEHICLE_IMAGE, vehicleImageRef };
// }

function addPostValidations(postAdValidationDetails) {
  return {
    type: postAdConstants.ADD_POSTAD_VALIDATIONS,
    postAdValidationDetails,
  };
}
