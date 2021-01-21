import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles,
  Link
  // IconButton,
} from "@material-ui/core";

//   import MenuIcon from '@material-ui/icons/Menu';
import { userActions } from "../../actions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    backgroundColor: "#153e4d",
    color: "white",
  },
  menuButton: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    flexDirection: "left",
  },
  title: {
    flexGrow: 1,
  },
  buttons: {
      '& > *': {
        margin: theme.spacing(1),
      },
  },
}));

const NavMenu = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  console.log("(NavMenu)========================== state", state);
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();



  const handleLogout = () => {
    // event.preventDefault();
    console.log("222 -- Logout Logout");
    if (currentUser.loggedIn && currentUser.user) {
        dispatch(userActions.userLogout("/login"));
    }
};


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <Link href="/" color="inherit">
              Sri Laxmi Cars
            </Link>
          </Typography>
          {/* <Typography variant="h8" className={classes.menuButton}>
            Hb colony - Moulali
          </Typography> */}
          <Typography variant="subtitle2" className={classes.menuButton}>
            contact us @ +91 9908109814 / ckumar.slc@gmail.com
          </Typography>
          <div  className={classes.buttons}>
          {/* <Button color="primary" size="small" variant="contained" >Login</Button> */}
          
          {!currentUser.loggedIn && <Button size="small" variant="contained" href="/login" >Login</Button> }
          {currentUser.loggedIn && <Button size="small" variant="contained" href="/postAd" >Post AD</Button> }
          {currentUser.loggedIn && <Button size="small" variant="contained" href="/register" >Register User</Button> }
          {currentUser.loggedIn && <Button size="small" variant="contained" href="/listings" >Ads</Button> }
          {currentUser.loggedIn && <Button size="small" variant="contained" href="/myAccount" >My Account</Button> }
          <Button size="small" variant="contained" href="/aboutUs">About Us</Button>
          {currentUser.loggedIn && <Button color="primary" size="small" variant="contained" onClick={handleLogout} >Logout</Button> }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavMenu;

