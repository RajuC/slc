import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  Divider,
  Grid,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Container,
} from "@material-ui/core";

import PostHeader from "./PostHeader";
import { postAdActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  cardContent: {},
  cardGrid: {
    marginTop: 10,
  },
  formControl: {
    margin: theme.spacing(),
  },
  submit: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const valObj = {
  value: "",
  error: false,
  errorText: "ex: Excellent condition, No accidents, Must see",
};

const PostCarFeatures = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [carFeatures, setCarFeatures] = useState({
    acFront: false,
    acRear: false,
    backupCamera: false,
    cruiseControl: false,
    navigation: false,
    powerLocks: false,
    powerSteering: false,
    amFmSterio: false,
    cdPlayer: false,
    dvdSystem: false,

    mp3Player: false,
    portableAudio: false,
    premiumAudio: false,
    airbagDriver: false,
    airbagPassenger: false,
    antilockBrakes: false,
    bluetooth: false,
    handsFree: false,
    fogLights: false,
    securitySystem: false,

    bucketSeats: false,
    heatedSeats: false,
    leatherInterior: false,
    memorySeats: false,
    powerSeats: false,
    thirdRowSeats: false,

    powerWindows: false,
    windowsDefroster: false,
    rearWindow: false,
    wiperTintedGlass: false,
    alloyWheels: false,
    keylessEntry: false,
    sunroof: false,
    towPackage: false,
    trailerHitch: false,
  });

  const features = useSelector((state) => state.postAd.details.features);

  const updateValObjWithVal = (data) => {
    if (data && data.value) {
      return {
        ...valObj,
        value: data.value,
      };
    } else {
      return {
        ...valObj,
        value: [],
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


  const handleChange = (event) => {
    setCarFeatures({
      ...carFeatures,
      [event.target.name]: event.target.checked,
    });
    let vehicleFeatures = "";
    if (features.length === 0 && !features.value) {
      vehicleFeatures = {
        ...valObj,
        value: [{ [event.target.name]: event.target.checked }],
      };
    } else {
      if (event.target.checked == true) {
        _.merge(features.value, [
          ...features.value,
          ...[{ [event.target.name]: event.target.checked }],
        ]);
        vehicleFeatures = features;
      } else {
        vehicleFeatures = {
          ...valObj,
          value: features.value.filter(
            (f) => Object.keys(f)[0] !== event.target.name
          )
        };
        if (vehicleFeatures.value.length === 0) {
          vehicleFeatures = 
            updateValObjWithError(
              `Make sure some of the vehicle features are selected!`
            )
        }
      }
    }

    dispatch(postAdActions.addVehicleFeatures(vehicleFeatures));
  };

  const title = "Select Your Car Features";
  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <PostHeader title={title} />
      <form autoComplete="off" noValidate className={classes.root} {...rest}>
        <Card>
          <Divider />
          <CardContent className={classes.cardContent}>
            <Grid container spacing={3}>
              <Grid item md={2} sm={6} xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    {<Typography variant="subtitle2">Comfort</Typography>}
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.acFront}
                          onChange={handleChange}
                          name="acFront"
                        />
                      }
                      label={<Typography variant="button">AC Front</Typography>}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.acRear}
                          onChange={handleChange}
                          name="acRear"
                        />
                      }
                      label={<Typography variant="button">AC Rear</Typography>}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.backupCamera}
                          onChange={handleChange}
                          name="backupCamera"
                        />
                      }
                      label={
                        <Typography variant="button">Backup Camera</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.cruiseControl}
                          onChange={handleChange}
                          name="cruiseControl"
                        />
                      }
                      label={
                        <Typography variant="button">Cruise Control</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.navigation}
                          onChange={handleChange}
                          name="navigation"
                        />
                      }
                      label={
                        <Typography variant="button">Navigation</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.powerLocks}
                          onChange={handleChange}
                          name="powerLocks"
                        />
                      }
                      label={
                        <Typography variant="button">Power Locks</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.powerSteering}
                          onChange={handleChange}
                          name="powerSteering"
                        />
                      }
                      label={
                        <Typography variant="button">Power Steering</Typography>
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    {<Typography variant="subtitle2">Entertainment</Typography>}
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.amFmSterio}
                          onChange={handleChange}
                          name="amFmSterio"
                        />
                      }
                      label={
                        <Typography variant="button">AM/FM Stereo</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.cdPlayer}
                          onChange={handleChange}
                          name="cdPlayer"
                        />
                      }
                      label={
                        <Typography variant="button">CD Player</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.dvdSystem}
                          onChange={handleChange}
                          name="dvdSystem"
                        />
                      }
                      label={
                        <Typography variant="button">DVD System</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.mp3Player}
                          onChange={handleChange}
                          name="mp3Player"
                        />
                      }
                      label={
                        <Typography variant="button">MP3 Player</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.portableAudio}
                          onChange={handleChange}
                          name="portableAudio"
                        />
                      }
                      label={
                        <Typography variant="button">Portable Audio</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.premiumAudio}
                          onChange={handleChange}
                          name="premiumAudio"
                        />
                      }
                      label={
                        <Typography variant="button">Premium Audio</Typography>
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    {<Typography variant="subtitle2">Safety</Typography>}
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.airbagDriver}
                          onChange={handleChange}
                          name="airbagDriver"
                        />
                      }
                      label={
                        <Typography variant="button">Airbag Driver</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.airbagPassenger}
                          onChange={handleChange}
                          name="airbagPassenger"
                        />
                      }
                      label={
                        <Typography variant="button">
                          Airbag Passenger
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.antilockBrakes}
                          onChange={handleChange}
                          name="antilockBrakes"
                        />
                      }
                      label={
                        <Typography variant="button">
                          Antilock Brakes
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.bluetooth}
                          onChange={handleChange}
                          name="bluetooth"
                        />
                      }
                      label={
                        <Typography variant="button">Bluetooth</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.handsFree}
                          onChange={handleChange}
                          name="handsFree"
                        />
                      }
                      label={
                        <Typography variant="button">Hands Free</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.fogLights}
                          onChange={handleChange}
                          name="fogLights"
                        />
                      }
                      label={
                        <Typography variant="button">Fog Lights</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.securitySystem}
                          onChange={handleChange}
                          name="securitySystem"
                        />
                      }
                      label={
                        <Typography variant="button">
                          Security System
                        </Typography>
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    {<Typography variant="subtitle2">Seats</Typography>}
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.bucketSeats}
                          onChange={handleChange}
                          name="bucketSeats"
                        />
                      }
                      label={
                        <Typography variant="button">Bucket Seats</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.heatedSeats}
                          onChange={handleChange}
                          name="heatedSeats"
                        />
                      }
                      label={
                        <Typography variant="button">Heated Seats</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.leatherInterior}
                          onChange={handleChange}
                          name="leatherInterior"
                        />
                      }
                      label={
                        <Typography variant="button">
                          Leather Interior
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.memorySeats}
                          onChange={handleChange}
                          name="memorySeats"
                        />
                      }
                      label={
                        <Typography variant="button">Memory Seats</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.powerSeats}
                          onChange={handleChange}
                          name="powerSeats"
                        />
                      }
                      label={
                        <Typography variant="button">Power Seats</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.thirdRowSeats}
                          onChange={handleChange}
                          name="thirdRowSeats"
                        />
                      }
                      label={
                        <Typography variant="button">
                          Third Row Seats
                        </Typography>
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    {<Typography variant="subtitle2">Windows</Typography>}
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.powerWindows}
                          onChange={handleChange}
                          name="powerWindows"
                        />
                      }
                      label={
                        <Typography variant="button">Power Windows</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.windowsDefroster}
                          onChange={handleChange}
                          name="windowsDefroster"
                        />
                      }
                      label={
                        <Typography variant="button">
                          Windows Defroster
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.rearWindow}
                          onChange={handleChange}
                          name="rearWindow"
                        />
                      }
                      label={
                        <Typography variant="button">Rear Window</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.wiperTintedGlass}
                          onChange={handleChange}
                          name="wiperTintedGlass"
                        />
                      }
                      label={
                        <Typography variant="button">
                          Wiper Tinted Glass
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.sunroof}
                          onChange={handleChange}
                          name="sunroof"
                        />
                      }
                      label={<Typography variant="button">Sunroof</Typography>}
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    {<Typography variant="subtitle2">Others</Typography>}
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.alloyWheels}
                          onChange={handleChange}
                          name="alloyWheels"
                        />
                      }
                      label={
                        <Typography variant="button">Alloy Wheels</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.keylessEntry}
                          onChange={handleChange}
                          name="keylessEntry"
                        />
                      }
                      label={
                        <Typography variant="button">Keyless Entry</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.towPackage}
                          onChange={handleChange}
                          name="towPackage"
                        />
                      }
                      label={
                        <Typography variant="button">Tow Package</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={carFeatures.trailerHitch}
                          onChange={handleChange}
                          name="trailerHitch"
                        />
                      }
                      label={
                        <Typography variant="button">Trailer Hitch</Typography>
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-start" p={2}>
            {features && features.error && (
              <Typography variant="button" display="block" color="error">
                *** {features.errorText}
              </Typography>
            )}
          </Box>
        </Card>
      </form>
    </Container>
  );
};

export default PostCarFeatures;
