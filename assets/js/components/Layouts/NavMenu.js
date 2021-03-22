import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles,
  Link,
  useMediaQuery,
  // IconButton,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
//   import MenuIcon from '@material-ui/icons/Menu';
import { userActions } from "../../actions";
import MiniNavMenu from "./MiniNavMenu";
import NavItems from "./NavItems";
import CustomButton from "./CustomButton"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "4%"
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#153e4d",
    // minHeight: "15px"
  },
  menuButton: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    flexDirection: "left",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));


const NavMenu = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  console.log("(NavMenu)========================== state", state);
  // const currentUser = useSelector((state) => state.currentUser);
  // const dispatch = useDispatch();
  // const theme = useTheme();


  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0} className={classes.appBar}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.toolbarTitle}>
            <Link href="/" color="inherit">
              Sri Laxmi Cars
            </Link>
          </Typography>
          {/* <Typography variant="h8" className={classes.menuButton}>
            Hb colony - Moulali
          </Typography> */}
          {/* <Typography variant="subtitle2" className={classes.menuButton}>
            contact us @ +91 9908109814 / ckumar.slc@gmail.com
          </Typography> */}
          {/* <div className={classes.buttons}>
            {!currentUser.loggedIn && (
              <Button size="small" variant="contained" href="/login">
                Login
              </Button>
            )}
            {currentUser.loggedIn && (
              <Button size="small" variant="contained" href="/postAd">
                Post AD
              </Button>
            )}
            {currentUser.loggedIn && (
              <Button size="small" variant="contained" href="/register">
                Register User
              </Button>
            )}
            {currentUser.loggedIn && (
              <Button size="small" variant="contained" href="/listings">
                Ads
              </Button>
            )}
            {currentUser.loggedIn && (
              <Button size="small" variant="contained" href="/myAccount">
                My Account
              </Button>
            )}
            <Button size="small" variant="contained" href="/aboutUs">
              About Us
            </Button>
            {currentUser.loggedIn && (
              <Button
                color="primary"
                size="small"
                variant="contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div> */}

          <NavItems />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavMenu;
