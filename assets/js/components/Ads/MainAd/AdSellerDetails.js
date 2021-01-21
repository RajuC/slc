import React, { useState, useEffect, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import numeral from "numeral";
import { MapPin as MapPinIcon } from "react-feather";
import { useGoogleMaps } from "react-hook-google-maps";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Paper,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import CustomButton from "../../Layouts/CustomButton";
import Label from "../../Layouts/Label";

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: "#153e4d", color: "white", marginTop: "6%" },
  details: { padding: theme.spacing(1) },
}));

const SellerDetails = ({ detail, value }) => (
  <Grid item xs={12} key={detail}>
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <Label color="primary">
          <Typography display="inline" variant="caption">
            {detail}
          </Typography>
        </Label>
        <Typography
          variant="subtitle2"
          display="inline"
          style={{ marginLeft: "16px" }}
        >
          {value}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);

const AdSellerDetails = ({ postId, contactDetails, location }) => {
  const classes = useStyles();
  const [showSellerDetails, setShowSellerDetails] = useState(false);
  const [sellerDetails, setSellerDetails] = useState({
    name: "",
    phone_number: "",
    email: "",
  });

  const { ref, map, google } = useGoogleMaps(
    // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
    "AIzaSyA-SvePR8DwM531CEbfJAipwszxCJwdvXk",
    // NOTE: even if you change options later
    {
      center: { lat: 0, lng: 0 },
      zoom: 3,
    }
  );

  console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
  console.log(google);

  const hideSellerDetails = () => {
    var email = contactDetails.email;
    var phone = contactDetails.phone_number;
    phone = phone.replace(phone.substring(5, 10), "*****");

    let hide = email.split("@")[0].length - 2; //<-- number of characters to hide
    var r = new RegExp(".{" + hide + "}@", "g");
    email = email.replace(r, "***@");

    setSellerDetails({
      ...sellerDetails,
      name: contactDetails.name,
      email: email,
      phone_number: phone,
    });
    setShowSellerDetails(false);
  };

  const viewSellerDetails = () => {
    setSellerDetails(contactDetails);
    setShowSellerDetails(true);
  };

  useEffect(() => {
    if (contactDetails) {
      hideSellerDetails();
    }
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <CardHeader title="Vehicle Location" />
        <Divider />
        <CardContent>
          <Paper variant="outlined">
            <Box className={classes.details}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2} direction="column" alignItems="center">
                  <Grid item>
                      <div ref={ref} style={{ minWidth: 200, minHeight: 150 }} />
                    </Grid>
                    <Grid item>
                      <MapPinIcon color="green" size={20} />
                      <Typography
                        variant="body2"
                        display="inline"
                        style={{ marginLeft: "10px" }}
                      >
                        {location}
                      </Typography>
                    </Grid>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardHeader title="Contact Seller" />
        <Divider />
        <CardContent>
          <Paper variant="outlined">
            <Box className={classes.details}>
              <Grid container spacing={2}>
                <SellerDetails detail="name" value={sellerDetails.name} />
                <SellerDetails detail="email" value={sellerDetails.email} />
                <SellerDetails
                  detail="phone"
                  value={"+91 " + sellerDetails.phone_number}
                />
              </Grid>
            </Box>
          </Paper>
          <Box mt={2} display="flex" justifyContent="flex-end">
            {!showSellerDetails && (
              <CustomButton
                onClick={() => {
                  viewSellerDetails();
                }}
              >
                View Details
              </CustomButton>
            )}
            {showSellerDetails && (
              <CustomButton
                onClick={() => {
                  hideSellerDetails();
                }}
              >
                Hide Details
              </CustomButton>
            )}
          </Box>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">
              Please read our
              <Link color="primary" component={RouterLink} to="#">
                Terms&conditions
              </Link>
              .
            </Typography>
          </Box>
          <Divider />
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Label color="success">{"Post Id: " + postId}</Label>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default AdSellerDetails;
