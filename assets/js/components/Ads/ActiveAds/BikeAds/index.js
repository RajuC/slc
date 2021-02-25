import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles, Grid } from "@material-ui/core";
import MiniAd from "../../MiniAd";
// import Results from "./Results";
import { apiService } from "../../../../services/apiService";
// import useIsMountedRef from "../../../../hooks/useIsMountedRef";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: 100,
    paddingRight:0,
    paddingLeft:0
  },
}));

const BikeAds = () => {
  console.log("(Bike Ads)========================== ads ");
  const classes = useStyles();
  //   const isMountedRef = useIsMountedRef();
  const [bikeAds, setBikeAds] = useState([]);

  const getBikeAds = async () => {
    try {
      const response = await apiService.listActiveAds();
      setBikeAds(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBikeAds();
  }, []);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={4}>
        {bikeAds.map((bikeAd) => (
          <Grid item key={bikeAd.id} xs={12} sm={6} md={4}>
            <MiniAd ad={bikeAd} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BikeAds;
