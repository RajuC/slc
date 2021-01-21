import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { Container, Grid, makeStyles } from "@material-ui/core";
// import Page from 'src/components/Page';
// import Profile from './Profile';
// import SearchBar from "./SearchBar";
// import AdCards from '../AdCards';
// import Scroll from '../Scroll';
// import Gallery from "./Gallery";
import { apiService } from "../../../services/apiService";
import AdCarousel from "./AdCarousel";
import AdDetails from "./AdDetails";
import AdSellerDetails from "./AdSellerDetails";
const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(4) },
}));

const MainAd = () => {
  const { id, action } = useParams();
  const classes = useStyles();
  const [ad, setAd] = useState(null);

  const getAd = async () => {
    try {
      const response = action
        ? await apiService.getAdById(id)
        : await apiService.getActiveAdById(id);

      setAd(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAd();
  }, []);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item lg={9} md={9} xs={12}>
          {ad && <AdDetails details={ad} />}
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          {ad && <AdSellerDetails postId={ad.id} contactDetails={ad.seller_details} location={ad.location.location_str}/>}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainAd;
