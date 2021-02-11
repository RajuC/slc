import React from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import { userActions } from '../../actions';
const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));


const MiniNavMenu = (props) => {
  const { handleLogout, history, name, menuItems, isIcon, icon: Icon } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (path) => {
    if (path == "/logout") {
      handleLogout()
    } else {
      history.push(path);
    }
    setAnchorEl(null);
  };



  if (isIcon) {
    return (
      <>
        <IconButton
          aria-label="Main Menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Icon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={() => setAnchorEl(null)}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {menuItems.map((item, menuindex) => (
            <MenuItem key={menuindex} onClick={() => handleMenuClick(item.path)}>{item.title}</MenuItem>
          ))}
        </Menu>
      </>
    )
  } else {
    return (
      <>
        <Link variant="button" color="textPrimary" onClick={handleMenu} className={classes.link}>
          {name}
        </Link>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={() => setAnchorEl(null)}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {menuItems.map((item, menuindex) => (
            <MenuItem key={menuindex} onClick={() => handleMenuClick(item.path)}>{item.title}</MenuItem>
          ))}
        </Menu>
      </>
    )
  }

}


export default withRouter(MiniNavMenu);