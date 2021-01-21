import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Header from "./Header";
import Results from "./Results";
import { apiService } from "../../services/apiService";
import useIsMountedRef from "../../hooks/useIsMountedRef";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: 100,
  },
}));

const Ads = () => {
  console.log("(All Ads)========================== ads ");
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [ads, setAds] = useState([]);

  const getAllAds = useCallback(async () => {
    try {
      const response = await apiService.listAllAds();

      if (isMountedRef.current) {
        setAds(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllAds();
  }, [getAllAds]);

  return (
    <Container maxWidth={false}>
      <Header />
      {ads && (
        <Box mt={3}>
          <Results ads={ads} />
        </Box>
      )}
    </Container>
  );
};

export default Ads;
