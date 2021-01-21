import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
    Button,
    Typography,
    makeStyles,
    Container,
    CssBaseline,
    Grid

  } from "@material-ui/core";

import Scroll from '../Layouts/Scroll';
// import Ads from '../Inventory/Ads';
// import { withRouter } from 'react-router-dom';
import VehicleTypeTabs from './VehicleTypeTabs';
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
  }
}));



const Home = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  console.log("(Home)========================== state", state);
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

//   const { history } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" href="/inventory/cars">
                    Buy a Car
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" href="/inventory/bikes">
                    Buy a Bike
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container maxWidth="lg">
          <h2 align="center"> FEATURED ITEMS</h2>
        </Container>
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
}

export default Home;