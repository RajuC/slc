import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomButtom from "../Layouts/CustomButton"
import {
  Button,
  Typography,
  makeStyles,
  Container,
  CssBaseline,
  Grid,
} from "@material-ui/core";

import Scroll from "../Layouts/Scroll";
// import Ads from '../Inventory/Ads';
// import { withRouter } from 'react-router-dom';
import VehicleTypeTabs from "./VehicleTypeTabs";
// import LogoGrid from './LogoGrid';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${"https://motors.stylemixthemes.com/classified/wp-content/uploads/sites/2/2016/02/listing_bnr-1917x619.jpg"})`,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  ads: {
    padding: 20,
    // backgroundColor: 'red',
  },
}));

const Home = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  // const currentUser = useSelector(state => state.currentUser);
  // const dispatch = useDispatch();

  //   const { history } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Sri Laxmi Cars
            </Typography>
            <Typography variant="h6" align="center" color="textPrimary">
              Best local dealer to sell or buy used cars with one phone call
            </Typography>
            <Typography variant="h6" align="center" color="textPrimary">
              Phone: +91 9908109814
            </Typography>
            {/* <Typography variant="h6" align="center" color="textSecondary">
              Email: ckumar.slc@gmail.com
            </Typography> */}
            <Typography variant="subtitle1" align="center" color="textSecondary">
              Address: NFC Main Rd, APHB Colony, Moula Ali
            </Typography>

            

            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <CustomButtom variant="contained" color="primary" href="/sell_car">
                    Sell a Car
                  </CustomButtom>
                </Grid>
                <Grid item>
                  <CustomButtom variant="contained" color="primary" href="/listings/cars">
                    Buy a Car
                  </CustomButtom>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        {/* <Container maxWidth="lg">
          <h2 align="center"> FEATURED ITEMS</h2>
        </Container> */}
        <Container maxWidth="md">
          <VehicleTypeTabs />
        </Container>
        {/* <Container maxWidth="lg" className={classes.ads}>
          <LogoGrid />
        </Container> */}
        {/* <h2 align="center"> MORE</h2>
        <Container maxWidth="lg" className={classes.ads}>
          <Ads />
        </Container> */}

        <Scroll showBelow={250} />
      </main>
    </React.Fragment>
  );
};

export default Home;
