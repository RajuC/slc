import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  makeStyles,
  useMediaQuery,
  // IconButton,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { userActions } from "../../actions";
import MiniNavMenu from "./MiniNavMenu";
import MenuIcon from "@material-ui/icons/Menu";
import CustomButton from "./CustomButton";
const useStyles = makeStyles((theme) => ({
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const mobileSizeMenuItems = [
  {
    title: "Cars",
    path: "/listings/cars",
    id: "car listings",
  },
  // {
  //   title: "Bikes",
  //   path: "/listings/bikes",
  //   id: "bike listings",
  // },
  {
    title: "Register",
    path: "/register",
    id: "register",
  },
  {
    title: "Ads",
    path: "/listings",
    id: "listings",
  },
  {
    title: "Post Ad",
    path: "/post/listing",
    id: "postad",
  },
  {
    title: "My Account",
    path: "/my_account",
    id: "my_account",
  },
];

const account = [
  {
    title: "Home",
    path: "/",
    id: "home",
  },
  {
    title: "Login",
    path: "/login",
    id: "1234",
  },
  {
    title: "About Us",
    path: "/aboutUs",
    id: "1234",
  },
];

const myAccount = [
  {
    title: "Home",
    path: "/",
    id: "home",
  },
  {
    title: "Profile",
    path: "/profile",
    id: "profile",
  },
  {
    title: "My Account",
    path: "/my_account",
    id: "my_account",
  },
  {
    title: "Logout",
    path: "/logout",
    id: "logout",
  },
];

const NavItems = (props) => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  console.log("(NavItems)========================== state", state);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const theme = useTheme();
  const ismobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    // event.preventDefault();
    console.log("222 -- Logout Logout");
    if (currentUser.loggedIn && currentUser.user) {
      dispatch(userActions.userLogout("/login"));
    }
    // setAnchorEl(null);
  };

  return (
    <div>
      {ismobile ? (
        <>
          {!currentUser.loggedIn && (
            <MiniNavMenu
              name="MenuIcon"
              isIcon={true}
              icon={MenuIcon}
              menuItems={account}
            />
          )}
          {currentUser.loggedIn && (
            <MiniNavMenu
              name="AccountIcon"
              isIcon={true}
              icon={AccountCircle}
              menuItems={mobileSizeMenuItems.concat(myAccount)}
              handleLogout={handleLogout}
            />
          )}
        </>
      ) : (
        <div className={classes.buttons}>
          {!currentUser.loggedIn && (
            <>
              <Button size="small" variant="contained" href="/">
                Home
              </Button>
              <Button size="small" variant="contained" href="/listings/cars">
                Buy
              </Button>
              <CustomButton size="small" variant="contained" href="/sell_car">
                Sell
              </CustomButton>
              <Button size="small" variant="contained" href="/login">
                Login
              </Button>
              <Button size="small" variant="contained" href="/aboutUs">
                About Us
              </Button>
            </>
          )}
          {currentUser.loggedIn && (
            <>
              <Button size="small" variant="contained" href="/">
                Home
              </Button>
              <Button size="small" variant="contained" href="/listings/cars">
                Cars
              </Button>
              {/* <Button size="small" variant="contained" href="/listings/bikes">
                Bikes
              </Button> */}
              <CustomButton size="small" variant="contained" href="/sell_car">
                Sell
              </CustomButton>
              <CustomButton size="small" variant="contained" href="/post/listing">
                Post slc ad
              </CustomButton>
              <Button size="small" variant="contained" href="/listings">
                Ads
              </Button>
              <Button size="small" variant="contained" href="/myAccount">
                My Account
              </Button>
              <Button size="small" variant="contained" href="/register">
                Register
              </Button>
              <Button size="small" variant="contained" href="/aboutUs">
                About Us
              </Button>
              <MiniNavMenu
                name="MyAccount"
                isIcon={true}
                icon={AccountCircle}
                menuItems={myAccount}
                handleLogout={handleLogout}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavItems;
