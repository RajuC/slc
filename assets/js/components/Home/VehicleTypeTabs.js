import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CarsIcon from '@material-ui/icons/DriveEta';
import BikesIcon from '@material-ui/icons/Motorcycle';
import CarAds from '../Ads/ActiveAds/CarAds';
import BikeAds from '../Ads/ActiveAds/BikeAds';


import {
    AppBar,
    Typography,
    makeStyles,
    useTheme,
    Tabs,
    Tab,
    Box,
  } from "@material-ui/core";





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'green',
    // paddingTop: 0,
    // padding: 0
  },
  tabPanel: {
    paddingTop: 10,
  }
}));


const VehicleTypeTabs = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="featured tabs"
        >
          <Tab label="Available Cars" icon={<CarsIcon />} {...a11yProps(0)} />
          <Tab label="Available Bikes" icon={<BikesIcon />} {...a11yProps(1)} />
          {/* <Tab label="Favorites" icon={<FavoriteIcon />} {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} className={classes.tabPanel}>
          <CarAds />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} className={classes.tabPanel}>
        <BikeAds />
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction} className={classes.tabPanel}>
          <Ads />
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}


export default  VehicleTypeTabs;