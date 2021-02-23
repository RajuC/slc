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
    paddingBottom: 20,
    paddingRight:0,
    paddingLeft:0
  },
}));

const CarAds = () => {
  console.log("(Car Ads)========================== ads ");
  const classes = useStyles();
  //   const isMountedRef = useIsMountedRef();
  const [carAds, setCarAds] = useState([]);

  const getCarAds = async () => {
    try {
      const response = await apiService.listAllAds();
      setCarAds(response.data);
      console.log("(Car Ads)========================== response.data ", response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCarAds();
  }, []);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={4}>
        {carAds.map((carAd) => (
          <Grid item key={carAd.id} xs={12} sm={6} md={4}>
            <MiniAd ad={carAd} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CarAds;
