import React, { useState, useEffect, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import numeral from "numeral";
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
  SvgIcon,
  Grid,
} from "@material-ui/core";
//   import axios from 'src/utils/axios';
//   import useIsMountedRef from 'src/hooks/useIsMountedRef';
import AdCarousel from "./AdCarousel";
import Label from "../../Layouts/Label";
import CustomButton from "../../Layouts/CustomButton";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { CheckCircle as CheckCircleIcon } from "react-feather";
const useStyles = makeStyles((theme) => ({
  root: { border: "2px" },
  boxDetails: { borderColor: "grey.500", padding: theme.spacing(3) },
  overview: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
      alignItems: "flex-start",
    },
  },
  productImage: {
    marginRight: theme.spacing(1),
    height: 48,
    width: 48,
  },
  ykf: {
    padding: "1%",
  },
  details: {
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  titlePrice: {
    padding: theme.spacing(2),
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
  featuress: {
    marginTop: "5px",
  },
}));

const VehicleDetail = ({ detail, value }) => (
  <Grid item lg={4} md={6} xs={12} key={detail}>
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <Label color="primary">
          <Typography display="inline" variant="caption">
            {detail}
          </Typography>
        </Label>
      {/* </Grid>
      <Grid item> */}
        <Typography
          variant="button"
          display="inline"
          style={{ marginLeft: "16px" }}
        >
          {value}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);

const VehicleDetailsTitle = ({ title }) => (
  <Label color="success">
    <Typography display="inline" variant="subtitle2">
      {title}
    </Typography>
  </Label>
);

const AdDetails = ({ details }) => {
  const classes = useStyles();
  console.log("(AdDetails)========================== ad details", details);
  const [showSellerDetails, setShowSellerDetails] = useState(false);

  return (
    <Card className={classes.root} variant="outlined" >
      {details && (
        <CardContent>
          <Paper variant="outlined">
            <Box
              display="flex"
              // justifyContent="flex-end"
              className={classes.titlePrice}
              m={1}
            >
              <Grid container spacing={8}>
                <Grid item lg={8} md={6} xs={12}>
                  <Typography variant="h6">{details.name}</Typography>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <CustomButton size="large">
                    <Typography variant="h6">
                      {"Rs. " +
                        numeral(details.asking_price).format(`0,0.00`) +
                        " /-"}
                    </Typography>
                  </CustomButton>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box className={classes.overview}>
              <AdCarousel imagesList={details.images} />
            </Box>
            <Divider />
            <Box className={classes.overview}>
              <VehicleDetailsTitle title="Vehicle Details" />
            </Box>
            <Divider />
            <Box className={classes.details}>
              <Grid container spacing={2} className={classes.ykf}>
                <VehicleDetail detail="brand" value={details.brand} />
                <VehicleDetail detail="model" value={details.model} />
                <VehicleDetail detail="variant" value={details.variant} />
                <VehicleDetail detail="year" value={details.year} />
                <VehicleDetail detail="fuel type" value={details.fuel_type} />
                <VehicleDetail detail="km driven" value={details.km_driven} />
                <VehicleDetail detail="body type" value={details.body_type} />
                <VehicleDetail
                  detail="transmission"
                  value={details.transmission}
                />
                <VehicleDetail
                  detail="no of owners"
                  value={details.no_of_owners}
                />
                <VehicleDetail detail="condition" value={details.condition} />
                <VehicleDetail
                  detail="Date Posted"
                  value={new Date(details.ad_active_timestamp).toDateString()}
                />
                <VehicleDetail detail="Post Id" value={details.id} />
              </Grid>
            </Box>

            <Divider />
            <Box className={classes.overview}>
              <VehicleDetailsTitle title="Additional Seller Notes" />
            </Box>
            <Divider />
            <Box className={classes.details}>
              <Grid container spacing={2} className={classes.ykf}>
                <Grid item xs={12}>
                  <Typography variant="button">
                    {details.seller_details.seller_notes}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box className={classes.overview}>
              <VehicleDetailsTitle title="Vehicle Features" />
            </Box>
            <Divider />
            <Box className={classes.details}>
              <Grid container spacing={2} className={classes.ykf}>
                {details.features.map((feature) => (
                  <Grid
                    item
                    xs={4}
                    lg={4}
                    md={6}
                    xs={12}
                    key={Object.keys(feature)[0]}
                  >
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <CheckCircleIcon color="green" size={25} />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="subtitle2"
                          display="inline"
                          style={{ marginLeft: "5px" }}
                        >
                          {Object.keys(feature)[0]}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button size="small" color="secondary" variant="contained">
              Upgrade plan
            </Button>
          </Box>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">
              The refunds don&apos;t work once you have the subscription, but
              you can always{" "}
              <Link color="secondary" component={RouterLink} to="#">
                Cancel your subscription
              </Link>
              .
            </Typography>
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

AdDetails.propTypes = {
  className: PropTypes.string,
};

export default AdDetails;
