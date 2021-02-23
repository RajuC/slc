import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { green, purple } from "@material-ui/core/colors";
import {
  PlusCircle as PlusCircleIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from "react-feather";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import RefreshIcon from "@material-ui/icons/Refresh";
import CustomButton from "../../Layouts/CustomButton";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(1) },
  title: { align: "center" },
  action: {
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(1),
    "& + &": {
      marginLeft: theme.spacing(1),
    },
  },
}));

const RefreshButton = withStyles((theme) => ({
  root: {
    // color: "#153e4d",
    backgroundColor: "#153e4d",
    "&:hover": {
      backgroundColor: "#169f36",
    },
  },
}))(Button);

const Header = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link variant="body1" color="inherit" to="/" component={RouterLink}>
            Home
          </Link>
          <Typography variant="body1" color="textPrimary">
            Ads
          </Typography>
        </Breadcrumbs>
        {/* <Typography
          variant="h4"
          color="textPrimary"
          className={classes.root}
        >
          All Ads
        </Typography> */}
      </Grid>
      <Grid item>
        <CustomButton
          variant="contained"
          color="primary"
          size="small"
          className={classes.action}
          component={RouterLink}
          to="/listings"
          startIcon={
            <SvgIcon fontSize="small">
              <RefreshIcon />
            </SvgIcon>
          }
        >
          Refresh Ads
        </CustomButton>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
