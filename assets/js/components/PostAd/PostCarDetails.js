import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Container,
  Box,
  Typography,
  Link,
  Button,
  InputAdornment,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

import PostHeader from "./PostHeader";
import { postAdActions } from "../../actions";
// import { postAdService, userService } from "../../services/postAdService";

import { apiService } from "../../services/apiService";
// import useIsMountedRef from "../../hooks/useIsMountedRef";
// import { cLog } from '../../helpers';
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {},
  cardContent: {
    marginTop: 20,
    marginBottom: 20,
  },
  cardGrid: {
    marginTop: 20,
  },
  submit: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const mandatoryText = "field cannot be empty";
const valObj = { value: "", error: false, errorText: "" };

const PostCarDetails = ({ className, ...rest }) => {
  // const isMountedRef = useIsMountedRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [formIsValid, setFormIsValid] = useState(true)
  const [carDetails, setCarDetails] = useState({
    type: "car",
    brand: valObj,
    model: valObj,
    variant: valObj,
    year: valObj,
    condition: valObj,
    fuelType: valObj,
    kmDriven: valObj,
    bodyType: valObj,
    transmission: valObj,
    noOfOwners: valObj,
  });

  const postAd = useSelector((state) => state.postAd.details);
  // const currentUser = useSelector(state => state.currentUser);

  const arrayToObject = (array) =>
    array.reduce((o, item) => {
      let newObj = new Object();
      newObj["title"] = item + "";
      newObj["value"] = item + "";
      return o.concat(newObj);
    }, []);

  const getYears = () => {
    let presentYear = new Date().getFullYear();
    let years = Array(36)
      .fill()
      .map((element, index) => index + (presentYear - 35));
    return arrayToObject(years.reverse());
  };

  const getConditions = () => {
    let condsArr = ["good", "very good", "excellent"];
    return arrayToObject(condsArr);
  };

  const getFuelTypes = () => {
    let fuelTypeArr = ["petrol", "diesel", "electric"];
    return arrayToObject(fuelTypeArr);
  };

  const getBodyTypes = () => {
    let bodyTypeArr = ["compact", "sedan", "hatch pack"];
    return arrayToObject(bodyTypeArr);
  };

  const getTransmissionTypes = () => {
    let transmissionTypeArr = ["manual", "automatic"];
    return arrayToObject(transmissionTypeArr);
  };

  const getNoOfOwners = () => {
    let noOfOwnersArr = [1, 2, 3, 4, "5+"];
    return arrayToObject(noOfOwnersArr);
  };

  const getCarBrands = async () => {
    try {
      const response = await apiService.listCarBrands("car");

        setCarAttr({
          ...carAttr,
          brands: arrayToObject(response.data),
        });
    } catch (err) {
      console.error(err);
    }
  };

  const getCarModels = async (type, brand) => {
    try {
      const response = await apiService.listCarModels(type, brand);
      setCarAttr({
        ...carAttr,
        models: arrayToObject(response.data),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getCarVariants = async (type, brand, model) => {
    try {
      const response = await apiService.listCarVariants(type, brand, model);

      setCarAttr({
        ...carAttr,
        variants: arrayToObject(response.data),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [carAttr, setCarAttr] = useState({
    brands: [],
    models: "",
    variants: "",
    years: getYears(),
    conditions: getConditions(),
    fuelTypes: getFuelTypes(),
    bodyTypes: getBodyTypes(),
    transmissions: getTransmissionTypes(),
    noOfOwners: getNoOfOwners(),
  });

  useEffect(() => {
    let postId =
      "2277-" +
      (Math.floor(Math.random() * 90000) + 10000) +
      Math.random().toString(36).substr(3, 3);
    dispatch(postAdActions.addPostId(postId));
    dispatch(postAdActions.addVehicleType(carDetails.type));
    getCarBrands();
  }, []);

  const updateValObjWithVal = (data) => {
    if (data && data.value) {
      return {
        ...valObj,
        value: data.value,
      };
    } else {
      return {
        ...valObj,
        value: "",
      };
    }
  };

  const updateValObjWithError = (errorText) => {
    return {
      ...valObj,
      value: "",
      error: true,
      errorText: errorText,
    };
  };

  const handleChange = (key, data) => {
    let vehicleDetails = "";
    if (data) {
      vehicleDetails = updateValObjWithVal(data);
    } else {
      vehicleDetails = updateValObjWithError(`${key} ${mandatoryText}!`);
    }

    setCarDetails({
      ...carDetails,
      [key]: vehicleDetails,
    });

    switch (key) {
      case "brand":
        return dispatch(postAdActions.addVehicleBrand(vehicleDetails));
      case "model":
        return dispatch(postAdActions.addVehicleModel(vehicleDetails));
      case "variant":
        return dispatch(postAdActions.addVehicleVariant(vehicleDetails));
      case "year":
        return dispatch(postAdActions.addVehicleYear(vehicleDetails));
      case "condition":
        return dispatch(postAdActions.addVehicleCondition(vehicleDetails));
      case "fuelType":
        return dispatch(postAdActions.addVehicleFuelType(vehicleDetails));
      case "kmDriven":
        return dispatch(postAdActions.addVehicleKmDriven(vehicleDetails));
      case "bodyType":
        return dispatch(postAdActions.addVehicleBodyType(vehicleDetails));
      case "transmission":
        return dispatch(postAdActions.addVehicleTransmission(vehicleDetails));
      case "noOfOwners":
        return dispatch(postAdActions.addVehicleNoOfOwners(vehicleDetails));
    }
  };

  const handleBrandChange = (data) => {
    if (data && data.value) {
      getCarModels(carDetails.type, data.value);
    } else {
      setCarAttr({
        ...carAttr,
        models: "",
        variants: "",
      });
    }
    handleChange("brand", data);
  };

  const handleModelChange = (data) => {
    if (data && data.value) {
      getCarVariants(carDetails.type, carDetails.brand.value, data.value);
    } else {
      setCarAttr({
        ...carAttr,
        variants: "",
      });
    }
    handleChange("model", data);
  };

  const handleKmDrivenChange = (data) => {
    // const re = /^([0-9]){4,6}$/;
    let vehicleDetails = "";
    const re = /^[0-9\b]+$/;
    if (!data.value) {
      vehicleDetails = updateValObjWithError(`KmDriven ${mandatoryText}!`);
    } else if (!re.test(data.value)) {
      vehicleDetails = updateValObjWithError(
        `Enter a Valid Number for Km Driven!`
      );
    } else {
      vehicleDetails = updateValObjWithVal(data);
    }
    setCarDetails({
      ...carDetails,
      kmDriven: vehicleDetails,
    });
  };

  const handleKmDrivenDispatch = (data) => {
    let vehicleDetails = "";
    const re = /^[0-9\b]+$/;
    if (!data.value) {
      vehicleDetails = updateValObjWithError(`KmDriven ${mandatoryText}!`);
    } else if (!re.test(data.value)) {
      vehicleDetails = updateValObjWithError(
        `Enter a Valid Number for Km Driven!`
      );
    } else {
      vehicleDetails = updateValObjWithVal(data);
    }
    dispatch(postAdActions.addVehicleKmDriven(vehicleDetails));
  };

  const title = "Enter Car Details";
  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <PostHeader title={title} />
      <form autoComplete="off" noValidate className={classes.root}>
        <Card>
          <Box
            display="flex"
            // justifyContent="flex-end"
            p={2}
            className={classes.cardContent}
          >
            <Grid container spacing={3}>
              <Grid item md={4} sm={6} xs={12}>
                <Autocomplete
                  id="vehicle-brand"
                  onChange={(event, data) => {
                    handleBrandChange(data);
                  }}
                  options={carAttr.brands}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Brand"
                      error={
                        postAd.brand && postAd.brand.error
                          ? postAd.brand.error
                          : carDetails.brand.error
                      }
                      helperText={
                        postAd.brand && postAd.brand.error
                          ? postAd.brand.errorText
                          : carDetails.brand.errorText
                      }
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              {carAttr.models && (
                <Grid item md={4} sm={6} xs={12}>
                  <Autocomplete
                    id="vehicle-model"
                    onChange={(event, data) => {
                      handleModelChange(data);
                    }}
                    options={carAttr.models}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Model"
                        error={
                          postAd.model && postAd.model.error
                            ? postAd.model.error
                            : carDetails.model.error
                        }
                        helperText={
                          postAd.model && postAd.model.error
                            ? postAd.model.errorText
                            : carDetails.model.errorText
                        }
                        variant="outlined"
                        required
                      />
                    )}
                  />
                </Grid>
              )}
              {carAttr.variants && (
                <Grid item md={4} sm={6} xs={12}>
                  <Autocomplete
                    id="vehicle-variant"
                    onChange={(event, data) => {
                      handleChange("variant", data);
                    }}
                    options={carAttr.variants}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Variant"
                        error={
                          postAd.variant && postAd.variant.error
                            ? postAd.variant.error
                            : carDetails.variant.error
                        }
                        helperText={
                          postAd.variant && postAd.variant.error
                            ? postAd.variant.errorText
                            : carDetails.variant.errorText
                        }
                        variant="outlined"
                        required
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider />
          <Box
            display="flex"
            // justifyContent="flex-end"
            p={2}
            className={classes.cardContent}
          >
            <Grid container spacing={5}>
              <Grid item md={3} sm={6} xs={12}>
                <Autocomplete
                  id="vehicle-year"
                  onChange={(event, data) => {
                    handleChange("year", data);
                  }}
                  options={carAttr.years}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Year"
                      error={
                        postAd.year && postAd.year.error
                          ? postAd.year.error
                          : carDetails.year.error
                      }
                      helperText={
                        postAd.year && postAd.year.error
                          ? postAd.year.errorText
                          : carDetails.year.errorText
                      }
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Autocomplete
                  id="vehicle-condition"
                  onChange={(event, data) => {
                    handleChange("condition", data);
                  }}
                  options={carAttr.conditions}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Condition"
                      error={
                        postAd.condition && postAd.condition.error
                          ? postAd.condition.error
                          : carDetails.condition.error
                      }
                      helperText={
                        postAd.condition && postAd.condition.error
                          ? postAd.condition.errorText
                          : carDetails.condition.errorText
                      }
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Autocomplete
                  id="vehicle-fuelType"
                  onChange={(event, data) => {
                    handleChange("fuelType", data);
                  }}
                  options={carAttr.fuelTypes}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Fuel Type"
                      error={
                        postAd.fuel_type && postAd.fuel_type.error
                          ? postAd.fuel_type.error
                          : carDetails.fuelType.error
                      }
                      helperText={
                        postAd.fuel_type && postAd.fuel_type.error
                          ? postAd.fuel_type.errorText
                          : carDetails.fuelType.errorText
                      }
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Autocomplete
                  id="vehicle-bodyType"
                  onChange={(event, data) => {
                    handleChange("bodyType", data);
                  }}
                  options={carAttr.bodyTypes}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Body Type"
                      error={
                        postAd.body_type && postAd.body_type.error
                          ? postAd.body_type.error
                          : carDetails.bodyType.error
                      }
                      helperText={
                        postAd.body_type && postAd.body_type.error
                          ? postAd.body_type.errorText
                          : carDetails.bodyType.errorText
                      }
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box
            display="flex"
            // justifyContent="flex-end"
            p={2}
            className={classes.cardContent}
          >
            <Grid container spacing={5}>
              <Grid item md={3} sm={6} xs={12}>
                <Autocomplete
                  id="vehicle-transmission"
                  onChange={(event, data) => {
                    handleChange("transmission", data);
                  }}
                  options={carAttr.transmissions}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Transmission"
                      error={
                        postAd.transmission && postAd.transmission.error
                          ? postAd.transmission.error
                          : carDetails.transmission.error
                      }
                      helperText={
                        postAd.transmission && postAd.transmission.error
                          ? postAd.transmission.errorText
                          : carDetails.transmission.errorText
                      }
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Autocomplete
                  id="vehicle-no-of-owners"
                  onChange={(event, data) => {
                    handleChange("noOfOwners", data);
                  }}
                  options={carAttr.noOfOwners}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="No of Owners"
                      error={
                        postAd.no_of_owners && postAd.no_of_owners.error
                          ? postAd.no_of_owners.error
                          : carDetails.noOfOwners.error
                      }
                      helperText={
                        postAd.no_of_owners && postAd.no_of_owners.error
                          ? postAd.no_of_owners.errorText
                          : carDetails.noOfOwners.errorText
                      }
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  fullWidth
                  id="vehicle-kmDriven"
                  label="Km Driven"
                  name="kmDriven"
                  onChange={(e) =>
                    handleKmDrivenChange({ value: e.target.value })
                  }
                  onBlur={(e) =>
                    handleKmDrivenDispatch({ value: e.target.value })
                  }
                  required
                  inputProps={{ maxLength: 6 }}
                  value={carDetails.kmDriven.value}
                  variant="outlined"
                  error={
                    postAd.km_driven && postAd.km_driven.error
                      ? postAd.km_driven.error
                      : carDetails.kmDriven.error
                  }
                  helperText={
                    postAd.km_driven && postAd.km_driven.error
                      ? postAd.km_driven.errorText
                      : carDetails.kmDriven.errorText
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">KM</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            {/* <Typography className={classes.submit}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Typography> */}
          </Box>
        </Card>
      </form>
    </Container>
  );
};

export default PostCarDetails;
