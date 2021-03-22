import { postAdConstants } from "../constants/postAdConstants";

import _ from "lodash";
const initialState = {
  details: {},
  posted: false,
};

export default function postAd(state = initialState, action) {
  //   console.log("(Action)========================== ", action);
  let postAdDetails = { ...state.details };
  let postAdFeatures = { ...postAdDetails.features };
  switch (action.type) {

    
    case postAdConstants.ADD_INITIAL_LISTING:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          ...action.initialListingDetails,
        },
      };


    case postAdConstants.ADD_EDIT_LISTING:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          [action.key]: action.listingDetails,
        },
      };

    case postAdConstants.ADD_VEHICLE_FEATURE:
      let updatedVehFeatures = "";
      if (postAdFeatures) {
        updatedVehFeatures = { ...postAdFeatures, ...action.vehicleFeature };
      }
      return {
        posted: false,
        details: {
          ...postAdDetails,
          features: updatedVehFeatures,
        },
      };

    case postAdConstants.REMOVE_VEHICLE_FEATURE:
      delete postAdFeatures[action.vehicleFeatureKey];
      return {
        posted: false,
        details: {
          ...postAdDetails,
          features: postAdFeatures,
        },
      };

    case postAdConstants.ADD_POST_ID:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          post_ad_id: action.postId,
        },
      };

    case postAdConstants.ADD_VEHICLE_TYPE:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          type: action.vehicleType,
        },
      };

    case postAdConstants.ADD_VEHICLE_BRAND:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          brand: action.brand,
        },
      };
    case postAdConstants.ADD_VEHICLE_MODEL:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          model: action.model,
        },
      };
    case postAdConstants.ADD_VEHICLE_VARIANT:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          variant: action.variant,
        },
      };
    case postAdConstants.ADD_VEHICLE_YEAR:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          year: action.year,
        },
      };
    case postAdConstants.ADD_VEHICLE_CONDITION:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          condition: action.condition,
        },
      };
    case postAdConstants.ADD_VEHICLE_FUELTYPE:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          fuel_type: action.fuelType,
        },
      };
    case postAdConstants.ADD_VEHICLE_KM_DRIVEN:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          km_driven: action.kmDriven,
        },
      };
    case postAdConstants.ADD_VEHICLE_BODY_TYPE:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          body_type: action.bodyType,
        },
      };
    case postAdConstants.ADD_VEHICLE_TRANSMISSION:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          transmission: action.transmission,
        },
      };
    case postAdConstants.ADD_VEHICLE_NO_OF_OWNERS:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          no_of_owners: action.noOfOwners,
        },
      };

    case postAdConstants.ADD_VEHICLE_SELLER_NOTES:
      let modSellerNotesDetails = {
        ...sellerDetails,
        seller_notes: action.sellerNotes,
      };
      return {
        posted: false,
        details: {
          ...postAdDetails,
          seller_details: modSellerNotesDetails,
        },
      };
    case postAdConstants.ADD_VEHICLE_SELLER_NAME:
      let modSellerNameDetails = {
        ...sellerDetails,
        name: action.sellerName,
      };
      return {
        posted: false,
        details: {
          ...postAdDetails,
          seller_details: modSellerNameDetails,
        },
      };
    case postAdConstants.ADD_VEHICLE_SELLER_EMAIL:
      let modSellerEmailDetails = {
        ...sellerDetails,
        email: action.sellerEmail,
      };
      return {
        posted: false,
        details: {
          ...postAdDetails,
          seller_details: modSellerEmailDetails,
        },
      };
    case postAdConstants.ADD_VEHICLE_SELLER_PHONE_NUM:
      let modSellerPhoneDetails = {
        ...sellerDetails,
        phone_number: action.sellerPhNum,
      };
      return {
        posted: false,
        details: {
          ...postAdDetails,
          seller_details: modSellerPhoneDetails,
        },
      };
    case postAdConstants.ADD_VEHICLE_LOCATION:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          location: action.vehicleLocation,
        },
      };
    case postAdConstants.ADD_VEHICLE_ASKING_PRICE:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          asking_price: action.askingPrice,
        },
      };

    case postAdConstants.ADD_VEHICLE_IMAGES:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          images: action.vehicleImages,
        },
      };

    // case postAdConstants.ADD_VEHICLE_FEATURES:
    //   if (postAdDetails.features.error) {
    //     return {
    //       posted: false,
    //       details: {
    //         ...postAdDetails,
    //         features: action.vehicleFeatures,
    //       },
    //     };
    //   } else {
    //     _.merge(postAdDetails.features, [
    //       ...postAdDetails.features,
    //       ...action.vehicleFeatures,
    //     ]);
    //     return {
    //       posted: false,
    //       details: postAdDetails,
    //     };
    //   }
    // case postAdConstants.ADD_VEHICLE_IMAGES:
    //   if (postAdDetails.images.error) {
    //     return {
    //       posted: false,
    //       details: {
    //         ...postAdDetails,
    //         images: action.vehicleImages,
    //       },
    //     };
    //   } else {
    //     _.merge(postAdDetails.images, [
    //       ...postAdDetails.images,
    //       ...action.vehicleImages,
    //     ]);
    //     return {
    //       posted: false,
    //       details: postAdDetails,
    //     };
    //   }
    // case postAdConstants.DELETE_VEHICLE_IMAGE:
    //   return {
    //     posted: false,
    //     details: {
    //       ...postAdDetails,
    //       images: newState.images.filter(
    //         (f) => f.imgRef !== action.vehicleImageRef
    //       ),
    //     },
    //   };
    case postAdConstants.ADD_POSTAD_VALIDATIONS:
      return {
        posted: false,
        details: {
          ...postAdDetails,
          ...action.postAdValidationDetails,
        },
      };

    case postAdConstants.POST_AD_REQUEST:
      return {
        posting: true,
        posted: false,
        details: postAdDetails,
      };
    case postAdConstants.POST_AD_SUCCESS:
      return {
        posting: false,
        posted: true,
        details: initialState,
      };
    case postAdConstants.POST_AD_ERROR:
      return {
        posting: false,
        posted: false,
        details: postAdDetails,
      };

    default:
      return state;
  }
}
