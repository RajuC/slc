export const validationService = {
    validatePostAd,
    validateLoginUserDetails,
    validateRegisterUserDetails,
    updateValObjWithError,
  };
  
  const mandatoryText = "field cannot be empty";
  const valObj = { value: "", error: false, errorText: "" };
  
  function updateValObjWithError(errorText) {
    return {
      ...valObj,
      value: "",
      error: true,
      errorText: errorText,
    };
  }
  
  function validatePostAd(postAd) {
    let isValid = true;
    const regex = /^([0-9]){4,6}$/;
  
    let postAdErrorVals = { ...postAd };
    console.log("(fileName)========================== 0", postAdErrorVals );
    let postAdSellerDetailsErrorVals = { ...postAd.seller_details };
    // let errorVals;
  
    if (!(postAd.asking_price && postAd.asking_price.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        asking_price: updateValObjWithError(`Asking Price ${mandatoryText}!`),
      };
      isValid = false;
    }
  
    if (!(postAd.location && postAd.location.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        location: updateValObjWithError(`Location ${mandatoryText}!`),
      };
      isValid = false;
    }
    
    if (!(postAdSellerDetailsErrorVals.name && postAdSellerDetailsErrorVals.name.value)) {
      postAdSellerDetailsErrorVals = {
        ...postAdSellerDetailsErrorVals,
        name: updateValObjWithError(`Seller Name ${mandatoryText}!`),
      }
      postAdErrorVals = {
        ...postAdErrorVals,
        seller_details: postAdSellerDetailsErrorVals,
      };
      isValid = false;

    }
    
    if (!(postAdSellerDetailsErrorVals.phone_number && postAdSellerDetailsErrorVals.phone_number.value)) {
      postAdSellerDetailsErrorVals = {
        ...postAdSellerDetailsErrorVals,
        phone_number: updateValObjWithError(`Seller Phone ${mandatoryText}!`),
      }
      postAdErrorVals = {
        ...postAdErrorVals,
        seller_details: postAdSellerDetailsErrorVals,
      };
      isValid = false;

    } 
    
    if (!(postAdSellerDetailsErrorVals.email && postAdSellerDetailsErrorVals.email.value)) {
      postAdSellerDetailsErrorVals = {
        ...postAdSellerDetailsErrorVals,
        email: updateValObjWithError(`Seller Email ${mandatoryText}!`),
      }
      postAdErrorVals = {
        ...postAdErrorVals,
        seller_details: postAdSellerDetailsErrorVals,
      };
      isValid = false;

    }
    
    if (!(postAdSellerDetailsErrorVals.seller_notes && postAdSellerDetailsErrorVals.seller_notes.value)) {
      postAdSellerDetailsErrorVals = {
        ...postAdSellerDetailsErrorVals,
        seller_notes: updateValObjWithError(`Seller Notes ${mandatoryText}!`),
      }
      postAdErrorVals = {
        ...postAdErrorVals,
        seller_details: postAdSellerDetailsErrorVals,
      };
      isValid = false;

    }

    if (postAd.features.length === 0 && !postAd.features.value) {
      postAdErrorVals = {
        ...postAdErrorVals,
        features: updateValObjWithError(
          `Make sure some of the vehicle features are selected!`
        ),
      };
      isValid = false;
    }
  
    if (postAd.images.length === 0 && !postAd.images.value) {
      postAdErrorVals = {
        ...postAdErrorVals,
        images: updateValObjWithError(
          `Make sure the vehicle images are uploaded!`
        ),
      };
      isValid = false;
    }
  
    if (!(postAd.brand && postAd.brand.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        brand: updateValObjWithError(`Brand ${mandatoryText}!`),
      };
      isValid = false;
    }
    if (!(postAd.model && postAd.model.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        model: updateValObjWithError(`Model ${mandatoryText}!`),
      };
      isValid = false;
    }
    if (!(postAd.variant && postAd.variant.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        variant: updateValObjWithError(`Variant ${mandatoryText}!`),
      };
      isValid = false;
    }
    if (!(postAd.year && postAd.year.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        year: updateValObjWithError(`Year ${mandatoryText}!`),
      };
      isValid = false;
    }
    if (!(postAd.condition && postAd.condition.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        condition: updateValObjWithError(`Condition ${mandatoryText}!`),
      };
      isValid = false;
    }
    if (!(postAd.fuel_type && postAd.fuel_type.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        fuel_type: updateValObjWithError(`FuelType ${mandatoryText}!`),
      };
      isValid = false;
    }
    if (!(postAd.no_of_owners && postAd.no_of_owners.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        no_of_owners: updateValObjWithError(`NoOfOwners ${mandatoryText}!`),
      };
      isValid = false;
    }
    if (!(postAd.body_type && postAd.body_type.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        body_type: updateValObjWithError(`BodyType ${mandatoryText}!`),
      };
      isValid = false;
    }
    if (!(postAd.transmission && postAd.transmission.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        transmission: updateValObjWithError(`Transmission ${mandatoryText}!`),
      };
      isValid = false;
    }
    if (!(postAd.km_driven && postAd.km_driven.value)) {
      postAdErrorVals = {
        ...postAdErrorVals,
        km_driven: updateValObjWithError(`KmDriven ${mandatoryText}!`),
      };
      isValid = false;
    }
  
    if (isValid) {
      return { isValid };
    } else {
      return { isValid, postAdErrorVals };
    }
  }
  
  function validateLoginUserDetails(loginVals) {
      let isValid = true;
      let loginErrorVals = { ...loginVals };
  
      if (!(loginVals.loginId && loginVals.loginId.value)) {
          loginErrorVals = {
            ...loginErrorVals,
            loginId: updateValObjWithError(`LogIn ID ${mandatoryText}!`),
          };
          isValid = false;
        }
      
        if (!(loginVals.password && loginVals.password.value)) {
          loginErrorVals = {
            ...loginErrorVals,
            password: updateValObjWithError(`Password ${mandatoryText}!`),
          };
          isValid = false;
        }
  
        if (isValid) {
          return { isValid };
        } else {
          return { isValid, loginErrorVals };
        }
  
  
  }
  
  
  function validateRegisterUserDetails(registerVals) {
      console.log("(registerVals)========================== ", registerVals );
      let isValid = true;
      let registerErrorVals = { ...registerVals };
  
      if (!(registerVals.email && registerVals.email.value)) {
          registerErrorVals = {
            ...registerErrorVals,
            email: updateValObjWithError(`Email ${mandatoryText}!`),
          };
          isValid = false;
        }
      
        if (!(registerVals.password && registerVals.password.value)) {
          registerErrorVals = {
            ...registerErrorVals,
            password: updateValObjWithError(`Password ${mandatoryText}!`),
          };
          isValid = false;
        }
      
        if (!(registerVals.name && registerVals.name.value)) {
          registerErrorVals = {
            ...registerErrorVals,
            name: updateValObjWithError(`First Name ${mandatoryText}!`),
          };
          isValid = false;
        }
  
        if (!(registerVals.login_id && registerVals.login_id.value)) {
          registerErrorVals = {
            ...registerErrorVals,
            login_id: updateValObjWithError(`Login Id ${mandatoryText}!`),
          };
          isValid = false;
        }

        if (!(registerVals.role && registerVals.role.value)) {
            registerErrorVals = {
              ...registerErrorVals,
              role: updateValObjWithError(`Role ${mandatoryText}!`),
            };
            isValid = false;
          }
  
  
        if (isValid) {
          return { isValid };
        } else {
          return { isValid, registerErrorVals };
        }
  
  
  }
  