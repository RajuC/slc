import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import PostHeader from "./PostHeader";
import { red } from "@material-ui/core/colors";
import { postAdActions, alertActions } from "../../actions";

import { validationService } from "../../services/validationService";

const useStyles = makeStyles((theme) => ({
  root: {},
  cardContent: {
    marginTop: 40,
    backgroundColor: "grey",
  },
  submit: {
    marginTop: 100,

    "& > * + *": {
      marginLeft: theme.spacing(5),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PostSubmitDetails = () => {
  const classes = useStyles();
  const [alreadyUser, setAlreadyUser] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const postAd = useSelector((state) => state.postAd.details);
  const dispatch = useDispatch();

  // const orig = {" a ":1, " b ":2};
  // let result = {};
  // Object.entries(orig).forEach(([k, v]) => result[k.trim()] = v + 1);
  // console.log(result);

  const postAdSubmit = () => {
    let validationResult = validationService.validatePostAd(postAd);
    if (validationResult.isValid) {
      console.log("Success Validation Ready to post", postAd);
      let postAdObj = {};
      // let postAdObj = Object.assign(
      //   {},
      Object.entries(postAd).map(([k, v]) => {
        if (k == "post_ad_id") {
          postAdObj[k] = v;
          // ({ [k]: v })
        } else if (k == "type") {
          postAdObj[k] = v;
        } else if (k == "ad_status") {
          postAdObj[k] = v;
        } else if (k == "seller_details") {
          let sdObj = Object.assign(
            {},
            ...Object.entries(v).map(([k1, v1]) => ({ [k1]: v1.value }))
          );
          postAdObj[k] = sdObj;
        } else if (k == "selected_pricing_plan_id") {
          postAdObj[k] = v;
        } else {
          postAdObj[k] = v.value;
          // ({ [k]: v.value })
        }
      });
      // );

      // console.log("Success Validation Ready to postpostAdObj ", postAdObj);
      dispatch(postAdActions.submitAdDetails({ ad: postAdObj }, "/"));
    } else {
      dispatch(
        postAdActions.addPostValidations(validationResult.postAdErrorVals)
      );
      dispatch(alertActions.error("Please check all the fields!!"));
      console.log("failed Validation!!!!!!!!!!!!!");
    }
  };

  const payAdSubmit = () => {
    console.log("payAdSubmit...");
  };

  return (
    <Container className={classes.root} maxWidth="lg">
      <Card className={classes.cardContent}>
        <Box display="flex" justifyContent="center" p={2}>
          <Typography className={classes.submit}>
            <Button
              color="primary"
              variant="contained"
              disabled={!currentUser.loggedIn}
              onClick={postAdSubmit}
            >
              Post Ad
            </Button>
            <Button
              color="primary"
              variant="contained"
              disabled={!currentUser.loggedIn}
              onClick={payAdSubmit}
            >
              Pay for Ad
            </Button>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default PostSubmitDetails;
