import { apiService } from "./apiService";

export const adUtilsService = {
  getYears,
  getConditions,
  getFuelTypes,
  getBodyTypes,
  getTransmissionTypes,
  getNoOfOwners,
  // getCarBrands,
  // getCarModels,
  // getCarVariants,
  // arrayToObject,
  updateValObjWithVal,
  updateValObjWithError,
  getAdStatus,
  getTypes,
  getCarFeatures,
  getBikeFeatures,
  getInitialListing,
  getAttributes,
  // getBikeAttributes,
};

const valObj = { value: "", error: false, errorText: "", label: "" };

function updateValObjWithVal(field, data) {
  let initialObj = getInitialListing();
  let initialValObj = initialObj[field];
  // console.log(
  //   "(adUtilsService)==========================initialValObj ",
  //   initialValObj
  // );
  if (initialValObj) {
    return {
      ...initialValObj,
      value: data,
    };
  }
  if (!initialValObj) {
    return updateValObjWithValnLabel(data, field);
  }
}

function updateValObjWithError(field, errorText) {
  let initialObj = getInitialListing();
  let initialValObj = initialObj[field];

  if (field == "location") {
    return {
      ...initialValObj,
      error: true,
      errorText: errorText,
    };
  } else {
    return {
      ...initialValObj,
      value: "",
      error: true,
      errorText: errorText,
    };
  }
}

function updateValObjWithLabel(label) {
  return {
    ...valObj,
    label: label,
  };
}

function updateValObjWithValnLabel(val, label) {
  return {
    ...valObj,
    label: label,
    value: val,
  };
}

// function arrayToObject(array) {
//   const arrObj = array.reduce((o, item) => {
//     let newObj = new Object();
//     newObj["title"] = item + "";
//     newObj["value"] = item + "";
//     return o.concat(newObj);
//   }, []);
//   return arrObj;
// }

function getYears() {
  let presentYear = new Date().getFullYear();
  let years = Array(36)
    .fill()
    .map((element, index) => (index + (presentYear - 35)).toString());
  // console.log("(years at adutilsservce)========================== ", years);
  // arrayToObject(years.reverse());
  // console.log("(years at adutilsservce)========================== ", arrayToObject(years.reverse()));
  return years.reverse();
}

function getTypes() {
  let typesArr = ["car"];
  return typesArr;
}

function getAdStatus() {
  let statusArr = ["Under Review", "Active", "Sold", "Inactive"];
  return statusArr;
}

function getConditions() {
  let condsArr = ["Good", "Very Good", "Excellent"];
  return condsArr;
}

function getFuelTypes() {
  let fuelTypeArr = ["Petrol", "Diesel", "Electric", "Hybrid"];
  return fuelTypeArr;
}

function getBodyTypes() {
  // let bodyTypeArr = ["Compact", "Sedan", "Hatch pack"];
  let bodyTypeArr = ["Hatchback", "Sedan", "SUV", "Crossover","Mini Van", "MPV", "Coupe", "Convertible", "Microcar", "Truck"];
  return bodyTypeArr;
}

function getTransmissionTypes() {
  let transmissionTypeArr = ["Manual", "Automatic"];
  return transmissionTypeArr;
}

function getNoOfOwners() {
  let noOfOwnersArr = ["1", "2", "3", "4", "5+"];
  return noOfOwnersArr;
}

function getInitialListing() {
  return {
    post_ad_id: updateValObjWithLabel("Post Ad ID"),
    type: updateValObjWithValnLabel("car", "Type"),
    ad_status: updateValObjWithValnLabel("Under Review", "Listing Status"),
    asking_price: updateValObjWithLabel("Asking Price"),
    body_type: updateValObjWithLabel("Body Type"),
    brand: updateValObjWithLabel("Brand"),
    condition: updateValObjWithLabel("Condition"),
    display_image_url: updateValObjWithLabel("Display Image Url"),
    features: updateValObjWithLabel("Features"),
    fuel_type: updateValObjWithLabel("Fuel Type"),
    km_driven: updateValObjWithLabel("KM Driven"),
    model: updateValObjWithLabel("Model"),
    no_of_owners: updateValObjWithLabel("No Of Owners"),
    seller_name: updateValObjWithLabel("Seller's Name"),
    seller_email: updateValObjWithLabel("Seller's Email"),
    seller_phone: updateValObjWithLabel("Seller's Phone"),
    images: {
      value: "",
      error: false,
      errorText: "Make sure you upload 4-7 images",
      label: "Images",
    },
    location: {
      value: { location_str: "", place_id: "", lat: "", long: "" },
      error: false,
      errorText: "only alphabets - ex: malkajgiri, secunderabad",
      label: "Location",
    },
    extra_notes: {
      value: "",
      error: false,
      errorText: "ex: Excellent condition, No accidents, Must see",
      label: "Seller's Additional Notes",
    },
    transmission: updateValObjWithLabel("Transmission"),
    variant: updateValObjWithLabel("Variant"),
    year: updateValObjWithLabel("Year"),
  };
}

function getCarFeatures() {
  return {
    acFront: { value: false, label: "Ac Front" },
    acRear: { value: false, label: "Ac Rear" },
    backupCamera: { value: false, label: "Backup Camera" },
    cruiseControl: { value: false, label: "Cruise Control" },
    navigation: { value: false, label: "Navigation" },
    powerLocks: { value: false, label: "Power Locks" },
    powerSteering: { value: false, label: "Power Steering" },
    amFmSterio: { value: false, label: "Am/Fm Sterio" },
    cdPlayer: { value: false, label: "CD Player" },
    dvdSystem: { value: false, label: "DVD System" },

    mp3Player: { value: false, label: "Mp3 Player" },
    portableAudio: { value: false, label: "Portable Audio" },
    premiumAudio: { value: false, label: "Premium Audio" },
    airbagDriver: { value: false, label: "Driver's Airbag" },
    airbagPassenger: { value: false, label: "Passenger's Airbag" },
    antilockBrakes: { value: false, label: "Antilock Brakes" },
    bluetooth: { value: false, label: "Bluetooth" },
    handsFree: { value: false, label: "Hands Free" },
    fogLights: { value: false, label: "Fog Lights" },
    securitySystem: { value: false, label: "Security System" },

    bucketSeats: { value: false, label: "Bucket Seats" },
    heatedSeats: { value: false, label: "Heated Seats" },
    leatherInterior: { value: false, label: "Leather Interior" },
    memorySeats: { value: false, label: "Memory Seats" },
    powerSeats: { value: false, label: "Power Seats" },
    thirdRowSeats: { value: false, label: "Third Row Seats" },

    powerWindows: { value: false, label: "Power Windows" },
    windowsDefroster: { value: false, label: "Windows Defroster" },
    rearWindow: { value: false, label: "Rear Window" },
    wiperTintedGlass: { value: false, label: "Wiper Tinted Glass" },
    alloyWheels: { value: false, label: "Alloy Wheels" },
    keylessEntry: { value: false, label: "Keyless Entry" },
    sunroof: { value: false, label: "Sunroof" },
    towPackage: { value: false, label: "Tow Package" },
    trailerHitch: { value: false, label: "Trailer Hitch" },
  };
}

function getBikeFeatures() {
  return {
    acFront: { value: false, label: "Ac Front" },
    acRear: { value: false, label: "Ac Rear" },
    backupCamera: { value: false, label: "Backup Camera" },
    cruiseControl: { value: false, label: "Cruise Control" },
    navigation: { value: false, label: "Navigation" },
    powerLocks: { value: false, label: "Power Locks" },
    powerSteering: { value: false, label: "Power Steering" },
    amFmSterio: { value: false, label: "Am/Fm Sterio" },
    cdPlayer: { value: false, label: "CD Player" },
    dvdSystem: { value: false, label: "DVD System" },

    mp3Player: { value: false, label: "Mp3 Player" },
    portableAudio: { value: false, label: "Portable Audio" },
    premiumAudio: { value: false, label: "Premium Audio" },
    airbagDriver: { value: false, label: "Driver's Airbag" },
    airbagPassenger: { value: false, label: "Passenger's Airbag" },
    antilockBrakes: { value: false, label: "Antilock Brakes" },
    bluetooth: { value: false, label: "Bluetooth" },
    handsFree: { value: false, label: "Hands Free" },
    fogLights: { value: false, label: "Fog Lights" },
    securitySystem: { value: false, label: "Security System" },

    bucketSeats: { value: false, label: "Bucket Seats" },
    heatedSeats: { value: false, label: "Heated Seats" },
    leatherInterior: { value: false, label: "Leather Interior" },
    memorySeats: { value: false, label: "Memory Seats" },
    powerSeats: { value: false, label: "Power Seats" },
    thirdRowSeats: { value: false, label: "Third Row Seats" },

    powerWindows: { value: false, label: "Power Windows" },
    windowsDefroster: { value: false, label: "Windows Defroster" },
    rearWindow: { value: false, label: "Rear Window" },
    wiperTintedGlass: { value: false, label: "Wiper Tinted Glass" },
    alloyWheels: { value: false, label: "Alloy Wheels" },
    keylessEntry: { value: false, label: "Keyless Entry" },
    sunroof: { value: false, label: "Sunroof" },
    towPackage: { value: false, label: "Tow Package" },
    trailerHitch: { value: false, label: "Trailer Hitch" },
  };
}

function getAttributes() {
  return {
    brands: [],
    models: [],
    variants: [],
    years: getYears(),
    conditions: getConditions(),
    fuelTypes: getFuelTypes(),
    bodyTypes: getBodyTypes(),
    transmissions: getTransmissionTypes(),
    noOfOwners: getNoOfOwners(),
    adStatus: getAdStatus(),
  };
}

// function getCarAttributes() {
//   return {
//     brands: [],
//     models: [],
//     variants: [],
//     years: getYears(),
//     conditions: getConditions(),
//     fuelTypes: getFuelTypes(),
//     bodyTypes: getBodyTypes(),
//     transmissions: getTransmissionTypes(),
//     noOfOwners: getNoOfOwners(),
//     adStatus: getAdStatus(),
//   };
// }

// function getBikeAttributes() {
//   return {
//     brands: [],
//     models: [],
//     years: getYears(),
//     conditions: getConditions(),
//     fuelTypes: getFuelTypes(),
//     noOfOwners: getNoOfOwners(),
//     adStatus: getAdStatus(),
//   };
// }

// function getCarBrands(){
//   const carBrands = async () => {
//     try {
//       const response = await apiService.listCarBrands("car");

//       return arrayToObject(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   carBrands();

// }

// function getCarModels(type, brand) {
//   const carModels = async (type, brand) => {
//     try {
//       const response = await apiService.listCarModels(type, brand);
//       return arrayToObject(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   carModels(type, brand);
// }

// function getCarVariants(type, brand, model) {
//   const carVariants = async (type, brand, model) => {
//     try {
//       const response = await apiService.listCarVariants(type, brand, model);

//       return arrayToObject(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   return carVariants(type, brand, model);
// }
