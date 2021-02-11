import React, { useState, useEffect, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

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
import GoogleMap from "../../Layouts/GoogleMap";

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: "#153e4d", color: "white", marginTop: "5%" },
  details: { padding: theme.spacing(1) },
  viewHideSd: { marginLeft: "100px", color: "#169f36" },
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

const AdSellerDetails = ({
  postId,
  seller_name,
  seller_email,
  seller_phone,
  location,
}) => {
  const classes = useStyles();
  const [showSellerDetails, setShowSellerDetails] = useState(false);
  const [sellerDetails, setSellerDetails] = useState({
    name: "",
    phone_number: "",
    email: "",
  });

  const hideSellerDetails = () => {
    seller_phone = seller_phone.replace(seller_phone.substring(5, 10), "*****");

    let hide = seller_email.split("@")[0].length - 2; //<-- number of characters to hide
    var r = new RegExp(".{" + hide + "}@", "g");
    seller_email = seller_email.replace(r, "***@");

    setSellerDetails({
      ...sellerDetails,
      name: seller_name,
      email: seller_email,
      phone_number: seller_phone,
    });
    setShowSellerDetails(false);
  };

  const viewSellerDetails = () => {
    setSellerDetails({
      ...sellerDetails,
      name: seller_name,
      email: seller_email,
      phone_number: seller_phone,
    });
    setShowSellerDetails(true);
  };

  useEffect(() => {
    if (seller_name && seller_email && seller_phone) {
      hideSellerDetails();
    }
  }, []);

  return (
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

              {!showSellerDetails && (
                <Link
                  className={classes.viewHideSd}
                  component="button"
                  underline="always"
                  variant="body2"
                  onClick={() => {
                    viewSellerDetails();
                  }}
                >
                  View Contact Details..
                </Link>
              )}
              {showSellerDetails && (
                <Link
                  className={classes.viewHideSd}
                  component="button"
                  underline="always"
                  variant="body2"
                  onClick={() => {
                    hideSellerDetails();
                  }}
                >
                  Hide Contact Details..
                </Link>
              )}
              <SellerDetails
                detail="address"
                value={
                  "NFC Main Rd, APHB Colony, Moula Ali, Secunderabad, Telangana 500040, India"
                }
              />
              <Grid item xs={12}>
                <GoogleMap
                  latt={location.lat}
                  long={location.long}
                  className={classes.gmap}
                />
                {/* <div
                  ref={ref}
                  style={{
                    minWidth: 220,
                    minHeight: 180,
                    border: "2px solid grey",
                  }}
                /> */}
              </Grid>
            </Grid>
          </Box>
        </Paper>
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
  );
};

export default AdSellerDetails;
