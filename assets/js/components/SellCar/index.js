import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { DropzoneAreaBase } from "material-ui-dropzone";

import CustomButton from "../Layouts/CustomButton";
import { Link as RouterLink } from "react-router-dom";
// import mapValues from "lodash/mapValues";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  makeStyles,
  Container,
  InputAdornment,
  //   Checkbox,
  //   FormControl,
  //   FormLabel,
  //   FormGroup,
  //   FormControlLabel,
  //   ImageList,
  //   ImageListItem,
  //   ImageListItemBar,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";
// import { ImageList } from "@material-ui/core/ImageList";
// // import Button from "@material-ui/core/Button";
// import { ImageListItem } from "@material-ui/core/ImageListItem";

import { userService } from "../../services/userService";
import { apiService } from "../../services/apiService";
import { adUtilsService } from "../../services/adUtilsService";
import { postAdActions } from "../../actions";
import ListingHeaders from "../AddEditListing/ListingHeaders";
import GoogleMaps from "../AddEditListing/GoogleMaps";
import Header from "../AddEditListing/Header";
import DisplayImages from "../AddEditListing/DisplayImages";
import storage from "../../helpers/firebase";

import { validationService } from "../../services/validationService";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 80,
  },
  card: {
    marginTop: 15,
  },
  cardGrid: {
    // marginTop: 20,
  },
  cardContent: {
    // marginTop: 20,
    marginBottom: 20,
  },
  submit: {
    marginRight: 30,
  },
  errorContent: {
    color: "red",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

const InputTextField = ({
  field,
  val,
  onChange,
  onBlurChange,
  listing,
  ipProps,
  rows,
  multiline,
}) => (
  <TextField
    fullWidth
    label={listing[field].label}
    id={listing[field].label}
    variant="outlined"
    name={field}
    rows={rows ? rows : 1}
    value={val}
    multiline={multiline ? multiline : false}
    onChange={(e) => onChange(field, e.target.value)}
    onBlur={(e) => onBlurChange(field, e.target.value)}
    error={listing[field] && listing[field].error}
    helperText={listing[field] && listing[field].errorText}
    InputLabelProps={{ shrink: true }}
    InputProps={ipProps}
    required
  />
);

const AutoCompleteField = ({
  options,
  onFieldChange,
  // label,
  customizedText,
  val,
  field,
  // listingDetails,
  listing,
}) => {
  // console.log("(AutoCompleteField)========================== listing", listing);
  return (
    <Autocomplete
      id={"Vehicle-" + listing[field].label}
      value={val}
      onChange={(event, data) => {
        if (data) {
          onFieldChange(field, data);
        }
      }}
      options={val ? options : options}
      // getOptionLabel={(option) => (option ? option : "")}
      noOptionsText={customizedText}
      getOptionLabel={(option) => option}
      getOptionSelected={(option, value) => {
        if (val == "") {
          return true;
        } else if (value === option) {
          return true;
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={listing[field].label}
          error={listing[field] && listing[field].error}
          helperText={listing[field] && listing[field].errorText}
          variant="outlined"
          required
        />
      )}
    />
  );
};

// const valObj = { value: "", error: false, errorText: "" };
const mandatoryText = " field cannot be empty";

const SellCar = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [action, setAction] = useState("post");
  const [editLocation, setEditLocation] = useState(false);
  const dispatch = useDispatch();
  const [listing, setListing] = useState(adUtilsService.getInitialListing());
  const [origLocListing, setOrigLocListing] = useState("");
  //   const [carFeatures, setCarFeatures] = useState(
  //     adUtilsService.getCarFeatures()
  //   );
  // const [bikeFeatures, setBikeFeatures] = useState(
  //   adUtilsService.getBikeFeatures()
  // );
  const [vehicleTypes, setVehicleType] = useState(adUtilsService.getTypes());

  // const [carAttr, setCarAttr] = useState(adUtilsService.getCarAttributes());
  // const [bikeAttr, setBikeAttr] = useState(adUtilsService.getBikeAttributes());
  const [attributes, setAttributes] = useState(adUtilsService.getAttributes());

  const [files, setFiles] = useState([]);
  const listingDetails = useSelector((state) => state.postAd.details);
  const currentUser = useSelector((state) => state.currentUser);
  const [progress, setProgress] = useState({ progress: 0 });
  // console.log(
  //   "(AddEditListing)========================== Listing Details ",
  //   id,
  //   action,
  //   listing,
  //   attributes
  // );

  //   const setFeatures = (type, features) => {
  //     if (type == "car") {
  //       setCarFeatures({
  //         ...carFeatures,
  //         ...features,
  //       });
  //     } else {
  //       setBikeFeatures({
  //         ...bikeFeatures,
  //         ...features,
  //       });
  //     }
  //   };

  const fetchLatLong = async (place_id, listingDetailsObj) => {
    try {
      const response = await apiService.getLatLong(place_id);
      let latitude = response.results[0].geometry.location.lat;
      let longitude = response.results[0].geometry.location.lng;
      let locVal = { ...listingDetailsObj.value };
      let LocListingDetailsObj = {
        ...listingDetailsObj,
        value: { ...locVal, lat: latitude, long: longitude },
      };
      setListing({
        ...listing,
        location: LocListingDetailsObj,
      });
      dispatch(postAdActions.addEditListing("location", LocListingDetailsObj));
    } catch (err) {
      console.error("getLatLong", err);
    }
  };

  const getSetBrands = async (type) => {
    if (type) {
      try {
        var response = "";
        if (type == "car") {
          response = await apiService.listCarBrands(type);
        }
        if (type == "bike") {
          response = await apiService.listBikeBrands(type);
        }
        setAttributes({
          ...attributes,
          brands: response.data,
        });
      } catch (err) {
        console.error("getSetBrands", err);
      }
    } else {
      setAttributes({
        ...attributes,
        brands: [],
      });
    }
  };

  const getSetModels = async (type, brand) => {
    try {
      var response = "";
      if (type == "car") {
        response = await apiService.listCarModels(type, brand);
      }
      if (type == "bike") {
        response = await apiService.listBikeModels(type, brand);
      }
      setAttributes({
        ...attributes,
        models: response.data,
      });
    } catch (err) {
      console.error("getSetModels", err);
    }
  };

  const getSetVariants = async (type, brand, model) => {
    try {
      const response = await apiService.listCarVariants(type, brand, model);

      setAttributes({
        ...attributes,
        variants: response.data,
      });
    } catch (err) {
      console.error("getSetVariants", err);
    }
  };

  const updateEditListing = (listingObj) => {
    return Object.keys(listingObj).reduce(
      (attrs, key) => ({
        ...attrs,
        [key]: adUtilsService.updateValObjWithVal(key, listingObj[key]),
      }),
      {}
    );
  };

  const getSetAttributes = async (type, brand, model) => {
    try {
      var brandResponse = "";
      var modelResponse = "";
      var variantResponse = "";
      if (type == "car") {
        brandResponse = await apiService.listCarBrands(type);
        modelResponse = await apiService.listCarModels(type, brand);
        variantResponse = await apiService.listCarVariants(type, brand, model);
      }
      if (type == "bike") {
        brandResponse = await apiService.listBikeBrands(type);
        modelResponse = await apiService.listBikeModels(type, brand);
        variantResponse = await apiService.listBikeVariants(type, brand, model);
      }

      setAttributes({
        ...attributes,
        brands: brandResponse.data,
        models: modelResponse.data,
        variants: variantResponse.data,
      });
    } catch (err) {
      console.error("getBrands", err);
    }
  };

  const getSetListing = async (listing_id) => {
    try {
      const response = await apiService.getAdById(listing_id);
      let listingToAdd = updateEditListing(response.data);
      setAction("edit");
      // setEditLocation(true);
      setListing(listingToAdd);
      setFeatures(response.data.type, response.data.features);
      let locDetailsObj = adUtilsService.updateValObjWithVal(
        "location",
        response.data.location
      );
      setOrigLocListing(locDetailsObj);
      getSetAttributes(
        response.data.type,
        response.data.brand,
        response.data.model
      );
    } catch (err) {
      console.error("getSetListing", err);
    }
  };

  const cancelEditLocation = () => {
    setListing({
      ...listing,
      location: origLocListing,
    });
    setEditLocation(false);
  };

  const saveEditLocation = () => {
    setOrigLocListing(listing.location);
    setEditLocation(false);
  };

  const handleImageUpload = (image) => {
    let img = new Image();
    var width, height;
    img.src = window.URL.createObjectURL(image);
    img.onload = () => {
      width = img.width;
      height = img.height;
    };
    // const { image } = this.state;
    return new Promise(function (resolve, reject) {
      let imageName = `${listing.post_ad_id.value}-${image.name}`;
      let ImageNameRef = storage.ref(imageName);
      const uploadTask = ImageNameRef.put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress({ progress });
        },
        (error) => {
          // Error function ...
          console.log(error);
          reject(error);
        },
        () => {
          // complete function ...
          ImageNameRef.getDownloadURL().then((imageUrl) => {
            resolve({
              url: imageUrl,
              name: image.name,
              imgRef: imageName,
              width: width,
              height: height,
            });
            // console.log("Image Url-------------------------", imageUrl);
            // this.setState({ url });
            // setImageUrls([...imageUrls, {url: imageUrl, name: image.name}]);
          });
        }
      );
    });
  };

  const handleAddImageDispatch = (imageUrls) => {
    let vehicleImages = "";

    if (!listing.images.value || listing.images.value.length === 0) {
      vehicleImages = adUtilsService.updateValObjWithVal("images", imageUrls);
    } else {
      vehicleImages = adUtilsService.updateValObjWithVal("images", [
        ...listing.images.value,
        ...imageUrls,
      ]);
    }

    setListing({
      ...listing,
      images: vehicleImages,
    });

    dispatch(postAdActions.addEditListing("images", vehicleImages));
  };

  const handleDeleteImageDispatch = (ImageNameRef) => {
    let vehicleImages = adUtilsService.updateValObjWithVal(
      "images",
      listing.images.value.filter((f) => f.imgRef !== ImageNameRef)
    );

    if (vehicleImages.value.length === 0) {
      vehicleImages = adUtilsService.updateValObjWithError(
        "images",
        "Please upload your vehicle Images!"
      );
    }

    setListing({
      ...listing,
      images: vehicleImages,
    });
    dispatch(postAdActions.addEditListing("images", vehicleImages));
  };

  const handleAddImage = (newFiles) => {
    //to remove duplicates
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    Promise.all(
      newFiles.map((file) => handleImageUpload(file.file))
    ).then((imageUrls) => handleAddImageDispatch(imageUrls));
    setFiles([...files, ...newFiles]);
  };

  const handleImageDelete = (image) => {
    setFiles(files.filter((f) => f.file.name !== image.name));
    let delImageNameRef = storage.ref(image.imgRef);
    delImageNameRef
      .delete()
      .then(() => {
        handleDeleteImageDispatch(image.imgRef);
      })
      .catch((err) => console.warn(err));
  };

  const handleLocationListingChange = (listingDetailsObj) => {
    // console.log(
    //   "(listingDetailsObj)========================== ",
    //   listingDetailsObj
    // );
    setListing({
      ...listing,
      location: listingDetailsObj,
    });
    if (listingDetailsObj.value.place_id) {
      fetchLatLong(listingDetailsObj.value.place_id, listingDetailsObj);
    }
  };

  const handleListingOnChange = (key, data) => {
    let listingDetailsObj = "";
    if (data) {
      listingDetailsObj = adUtilsService.updateValObjWithVal(key, data);
    } else {
      listingDetailsObj = adUtilsService.updateValObjWithError(
        key,
        `${listing[key].label} ${mandatoryText}!`
      );
    }

    setListing({
      ...listing,
      [key]: listingDetailsObj,
    });
  };

  const handleListingChange = (key, data) => {
    // console.log(
    //   "(handleListingChange)========================== listing",
    //   listing,
    //   key,
    //   data
    // );

    let listingDetailsObj = "";

    if (data) {
      listingDetailsObj = adUtilsService.updateValObjWithVal(key, data);
    } else {
      listingDetailsObj = adUtilsService.updateValObjWithError(
        key,
        `${listing[key].label} ${mandatoryText}!`
      );
    }

    if (key == "post_ad_id") {
      getSetBrands("car");
      setListing({
        ...listing,
        [key]: listingDetailsObj,
        brand: adUtilsService.updateValObjWithVal("brand", ""),
        model: adUtilsService.updateValObjWithVal("model", ""),
        variant: adUtilsService.updateValObjWithVal("variant", ""),
      });
      // } else if (key == "type") {
      //   getSetBrands(data);
      //   setListing({
      //     ...listing,
      //     [key]: listingDetailsObj,
      //     brand: adUtilsService.updateValObjWithVal("brand", ""),
      //     model: adUtilsService.updateValObjWithVal("model", ""),
      //     variant: adUtilsService.updateValObjWithVal("variant", ""),
      //   });
      // setAttributes({ ...attributes, models: [], variants: [] });
    } else if (key == "brand") {
      getSetModels(listing.type.value, data);
      setListing({
        ...listing,
        [key]: listingDetailsObj,
        model: adUtilsService.updateValObjWithVal("model", ""),
        variant: adUtilsService.updateValObjWithVal("variant", ""),
      });
      setAttributes({ ...attributes, models: [], variants: [] });
    } else if (key == "model") {
      getSetVariants(listing.type.value, listing.brand.value, data);
      setListing({
        ...listing,
        [key]: listingDetailsObj,
        variant: adUtilsService.updateValObjWithVal("variant", ""),
      });
      setAttributes({ ...attributes, variants: [] });
    } else {
      setListing({
        ...listing,
        [key]: listingDetailsObj,
      });
    }
    dispatch(postAdActions.addEditListing(key, listingDetailsObj));
  };

  //   x.toLocaleString('en-IN',{
  //     maximumFractionDigits: 0,
  //     style: 'currency',
  //     currency: 'INR'
  // });

  const handleInitialListingChange = (postBy) => {
    let postAdId =
      postBy +
      "-" +
      (Math.floor(Math.random() * 90000) + 10000) +
      Math.random().toString(36).substr(3, 3);

    const postAdIdListingDetailsObj = adUtilsService.updateValObjWithVal(
      "post_ad_id",
      postAdId
    );
    const postByListingDetailsObj = adUtilsService.updateValObjWithVal(
      "post_by",
      postBy
    );
    const typeListingDetailsObj = adUtilsService.updateValObjWithVal(
      "type",
      "car"
    );
    const featuresListingDetailsObj = adUtilsService.updateValObjWithVal(
        "features",
        {}
      );

    let initialListingDetails = {
      post_ad_id: postAdIdListingDetailsObj,
      post_by: postByListingDetailsObj,
      type: typeListingDetailsObj,
      features: featuresListingDetailsObj
    };
    getSetBrands("car");
    setListing({
      ...listing,
      ...initialListingDetails,
    });

    dispatch(postAdActions.addInitialListing(initialListingDetails));
  };

  useEffect(() => {
    handleInitialListingChange("non_slc");
  }, []);

  const postAdSubmit = () => {
    let validationResult = "";
    if (action == "edit") {
      validationResult = validationService.validateUpdateListing(
        listingDetails
      );
    }
    if (action == "post") {
      validationResult = validationService.validateAddListing(
        listingDetails.post_by.value,
        listingDetails
      );
    }
    if (validationResult.isValid) {
      // console.log("Success Validation Ready to post", validationResult);

      let postAdObj = {};

      Object.entries(validationResult.finalListingObj).map(([k, v]) => {
        postAdObj[k] = v.value;
      });
      // );

      console.log("Success Validation Ready to postpostAdObj ", postAdObj);
      if (action == "post") {
        dispatch(postAdActions.submitAdDetails(listingDetails.post_by.value, { ad: postAdObj }, "/"));
      }
      if (action == "edit") {
        dispatch(postAdActions.updateAdDetails({ id: id, ad: postAdObj }, "/"));
      }
    } else {
      console.log(
        "failed Validation!!!!!!!!!!!!! validationResult: ",
        validationResult
      );
      setListing(validationResult.finalListingObj);
      // dispatch(alertActions.error("Please check all the fields!!"));
    }
  };

  const title = action == "post" ? `Post Car Details` : `Post Ad: ${id}`;
  const cancelPath = action == "post" ? "/" : "/listings";

  return (
    <div className={classes.root}>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Box mt={2}>
          <Header title={title} cancelPath={cancelPath} />
        </Box>

        <form autoComplete="off" noValidate>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <ListingHeaders title="Vehicle Details" />
              <Box
                display="flex"
                // justifyContent="flex-end"
                p={2}
                className={classes.cardContent}
              >
                <Grid container spacing={3}>
                  {vehicleTypes != [] && (
                    <Grid item md={3} sm={6} xs={12}>
                      <AutoCompleteField
                        field="type"
                        onFieldChange={handleListingChange}
                        options={vehicleTypes}
                        val={listing.type.value}
                        listing={listing}
                      />
                    </Grid>
                  )}
                  {attributes.brands != [] && (
                    <Grid item md={3} sm={6} xs={12}>
                      <AutoCompleteField
                        field="brand"
                        onFieldChange={handleListingChange}
                        options={attributes.brands}
                        val={listing.brand.value}
                        listing={listing}
                        customizedText={"Please select the Type"}
                      />
                    </Grid>
                  )}
                  {attributes.models != [] && (
                    <Grid item md={3} sm={6} xs={12}>
                      <AutoCompleteField
                        field="model"
                        onFieldChange={handleListingChange}
                        options={attributes.models}
                        val={listing.model.value}
                        listing={listing}
                        customizedText={"Please select the Brand"}
                      />
                    </Grid>
                  )}
                  {listing.type.value == "car" && attributes.variants != [] && (
                    <Grid item md={3} sm={6} xs={12}>
                      <AutoCompleteField
                        field="variant"
                        onFieldChange={handleListingChange}
                        options={attributes.variants}
                        val={listing.variant.value}
                        listing={listing}
                        customizedText={"Please select the Model"}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
              {/* <Divider /> */}
              <Box
                display="flex"
                // justifyContent="flex-end"
                p={2}
                className={classes.cardContent}
              >
                <Grid container spacing={5}>
                  <Grid item md={3} sm={6} xs={12}>
                    <AutoCompleteField
                      field="year"
                      onFieldChange={handleListingChange}
                      options={attributes.years}
                      val={listing.year.value}
                      listing={listing}
                    />
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <AutoCompleteField
                      field="condition"
                      onFieldChange={handleListingChange}
                      options={attributes.conditions}
                      val={listing.condition.value}
                      listing={listing}
                    />
                  </Grid>
                  {/* {listing.type.value == "car" && ( */}
                  <Grid item md={3} sm={6} xs={12}>
                    <AutoCompleteField
                      field="fuel_type"
                      onFieldChange={handleListingChange}
                      options={attributes.fuelTypes}
                      val={listing.fuel_type.value}
                      listing={listing}
                    />
                  </Grid>
                  {/* )} */}
                  {listing.type.value == "car" && (
                    <Grid item md={3} sm={6} xs={12}>
                      <AutoCompleteField
                        field="body_type"
                        onFieldChange={handleListingChange}
                        options={attributes.bodyTypes}
                        val={listing.body_type.value}
                        listing={listing}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
              {/* <Divider /> */}
              <Box
                display="flex"
                // justifyContent="flex-end"
                p={2}
                className={classes.cardContent}
              >
                <Grid container spacing={5}>
                  {listing.type.value == "car" && (
                    <Grid item md={3} sm={6} xs={12}>
                      <AutoCompleteField
                        field="transmission"
                        onFieldChange={handleListingChange}
                        options={attributes.transmissions}
                        val={listing.transmission.value}
                        listing={listing}
                      />
                    </Grid>
                  )}
                  <Grid item md={3} sm={6} xs={12}>
                    <AutoCompleteField
                      field="no_of_owners"
                      onFieldChange={handleListingChange}
                      options={attributes.noOfOwners}
                      val={listing.no_of_owners.value}
                      listing={listing}
                    />
                  </Grid>

                  <Grid item md={3} sm={6} xs={12}>
                    <InputTextField
                      field="km_driven"
                      val={listing.km_driven.value}
                      onChange={handleListingOnChange}
                      onBlurChange={handleListingChange}
                      listing={listing}
                      ipProps={{
                        maxLength: 6,
                        endAdornment: (
                          <InputAdornment position="end">KM</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  {/* <Grid item md={3} sm={6} xs={12}>
                    <AutoCompleteField
                      field="ad_status"
                      onFieldChange={handleListingChange}
                      options={attributes.adStatus}
                      val={listing.ad_status.value}
                      listing={listing}
                    />
                  </Grid> */}
                </Grid>
              </Box>
              <Divider />

              <ListingHeaders title="Vehicle Images" />
              {listing.images && listing.images.error && (
                <Typography
                  variant="caption"
                  gutterBottom
                  className={classes.errorContent}
                >
                  {listing.images.errorText}
                </Typography>
              )}
              <Box
                display="flex"
                // justifyContent="flex-end"
                p={2}
                className={classes.cardContent}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <DropzoneAreaBase
                      acceptedFiles={["image/*"]}
                      filesLimit={10}
                      maxFileSize={10000000}
                      dropzoneText={"Drag and drop an image here or click"}
                      onAdd={handleAddImage}
                      // onAdd={(files) => handleAdd(files)}
                      onAlert={(message, variant) =>
                        console.log(`${variant}: ${message}`)
                      }
                    />
                  </Grid>
                  {listing.images.value && (
                    <Grid item xs={12}>
                      <DisplayImages
                        imagesList={
                          listing.images.value ? listing.images.value : []
                        }
                        onImageDel={handleImageDelete}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
              <Divider />
              <ListingHeaders title="Vehicle Asking Price" />
              <Box
                display="flex"
                // justifyContent="flex-end"
                p={2}
                className={classes.cardContent}
              >
                <Grid container spacing={3} className={classes.cardContent}>
                  <Grid item md={4} sm={6} xs={12}>
                    <InputTextField
                      field="asking_price"
                      val={listing.asking_price.value}
                      onChange={handleListingOnChange}
                      onBlurChange={handleListingChange}
                      listing={listing}
                      ipProps={{
                        startAdornment: (
                          <InputAdornment position="start">Rs</InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">.00 /-</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={8} sm={6} xs={12}>
                    <Typography variant="body2" gutterBottom>
                      Determine a competitive price by comparing your vehicle's
                      information and mileage to similar vehicles for sale by
                      dealers and private sellers in your area. Then consider
                      pricing your vehicle within range. Be sure to provide
                      Seller's Comments and photos to highlight the best
                      features of your vehicle, especially if your asking price
                      is above average.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <ListingHeaders title="Vehicle Location" />
              <Box
                display="flex"
                // justifyContent="flex-end"
                p={2}
                className={classes.cardContent}
              >
                <Grid container spacing={3} className={classes.cardContent}>
                  {action == "edit" && (
                    <>
                      <Grid item md={4} sm={6} xs={12}>
                        <Typography>
                          {origLocListing
                            ? origLocListing.value.location_str
                            : listing.location.value.location_str}
                        </Typography>
                      </Grid>
                      {!editLocation && (
                        <Grid item item md={1} sm={1} xs={2}>
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={(e) => setEditLocation(true)}
                          >
                            Edit
                          </Button>
                        </Grid>
                      )}
                    </>
                  )}
                  {action == "post" && (
                    <>
                      <Grid item md={4} sm={6} xs={12}>
                        <GoogleMaps
                          field="location"
                          locListing={listing.location}
                          onLocationFieldChange={handleLocationListingChange}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <Typography>
                          Tips 1. search your locality without spaces 2. don't
                          search cities directly, search sub-region or region
                        </Typography>
                      </Grid>
                    </>
                  )}
                  {editLocation && (
                    <>
                      <Grid item md={4} sm={6} xs={12}>
                        <GoogleMaps
                          field="location"
                          locListing={listing.location}
                          onLocationFieldChange={handleLocationListingChange}
                        />
                      </Grid>
                      {action == "edit" && (
                        <Grid item md={1} sm={1} xs={2}>
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={(e) => saveEditLocation()}
                          >
                            SAVE
                          </Button>
                        </Grid>
                      )}
                      {action == "edit" && (
                        <Grid item md={1} sm={1} xs={2}>
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={(e) => cancelEditLocation()}
                          >
                            Cancel
                          </Button>
                        </Grid>
                      )}
                    </>
                  )}
                </Grid>
              </Box>
              <Divider />
              <ListingHeaders title="Vehicle Additional Notes" />
              <Box
                display="flex"
                // justifyContent="flex-end"
                p={2}
                className={classes.cardContent}
              >
                <Grid container spacing={3} className={classes.cardContent}>
                  <Grid item xs={12}>
                    <InputTextField
                      field="extra_notes"
                      val={listing.extra_notes.value}
                      onChange={handleListingOnChange}
                      onBlurChange={handleListingChange}
                      listing={listing}
                      multiline={true}
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <ListingHeaders title="Vehicle Seller Details" />
              <Box
                display="flex"
                // justifyContent="flex-end"
                p={2}
                className={classes.cardContent}
              >
                <Grid container spacing={3} className={classes.cardContent}>
                  <Grid item md={4} sm={6} xs={12}>
                    <InputTextField
                      field="seller_name"
                      val={listing.seller_name.value}
                      onChange={handleListingOnChange}
                      onBlurChange={handleListingChange}
                      listing={listing}
                    />
                  </Grid>

                  <Grid item md={4} sm={6} xs={12}>
                    <InputTextField
                      field="seller_phone"
                      val={listing.seller_phone.value}
                      onChange={handleListingOnChange}
                      onBlurChange={handleListingChange}
                      listing={listing}
                      ipProps={{
                        startAdornment: (
                          <InputAdornment position="start">+91</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <InputTextField
                      field="seller_email"
                      val={listing.seller_email.value}
                      onChange={handleListingOnChange}
                      onBlurChange={handleListingChange}
                      listing={listing}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="center" p={3}>
                <Typography>
                  <CustomButton
                    color="primary"
                    size="small"
                    variant="contained"
                    // disabled={!currentUser.loggedIn}
                    className={classes.submit}
                    onClick={postAdSubmit}
                  >
                    {action == "post" ? "Submit" : "Update"}
                  </CustomButton>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    size="small"
                    component={RouterLink}
                    to="/listings"
                  >
                    Cancel
                  </CustomButton>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end" p={2}></Box>
            </CardContent>
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default SellCar;
