import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Container,
  Typography,
} from "@material-ui/core";

import _ from "lodash";
import PostHeader from "./PostHeader";
import { useDispatch, useSelector } from "react-redux";

import { postAdActions } from "../../actions";
// import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {},
  cardContent: {
    marginTop: 20,
  },
  cardGrid: {
    marginTop: 20,
  },
  submit: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const mandatoryText = " field cannot be empty";

const valObj = {
  value: "",
  error: false,
  errorText: "",
};

const PostSellerDetails = () => {
  const classes = useStyles();

  const [sellerDetails, setSellerDetails] = useState({
    name: valObj,
    email: valObj,
    phone_number: valObj,
    seller_notes: valObj,
  });

  // const [sellerNotes, setSellerNotes] = useState(valObj);
  const dispatch = useDispatch();
  const postAdSD = useSelector((state) => state.postAd.details.seller_details);
  // console.log("(PostSellerNotes - reducerState)========================== ", postAdSD );

  const updateValObjWithVal = (data) => {
    if (data && data.value) {
      return {
        ...valObj,
        value: data.value,
      };
    } else {
      return {
        ...valObj,
        value: "",
      };
    }
  };

  const updateValObjWithError = (errorText) => {
    return {
      ...valObj,
      value: "",
      error: true,
      errorText: errorText,
    };
  };

  const handleChange = (key, data) => {
    console.log("(fileName)========================== key", key, "data", data );
    let newData = "";
    if (data && data.value) {
      newData = updateValObjWithVal(data);
    } else {
      newData = updateValObjWithError(`${key} ${mandatoryText}!`);
    }

    setSellerDetails({
      ...sellerDetails,
      [key]: newData,
    });
  };

  const handleDispatch = (key, data) => {
    let newData = "";
    if (data && data.value) {
      newData = updateValObjWithVal(data);
    } else {
      newData = updateValObjWithError(`${key} ${mandatoryText}!`);
    }

    switch (key) {
      case "name":
        return dispatch(postAdActions.addSellerName(newData));
      case "phone_number":
        return dispatch(postAdActions.addSellerPhNum(newData));
      case "email":
        return dispatch(postAdActions.addSellerEmail(newData));
      case "seller_notes":
        return dispatch(postAdActions.addSellerNotes(newData));
    }
  };

  const title = "Enter Seller Details and Notes";
  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <PostHeader title={title} />
      <Card>
        <Divider />
        <CardContent className={classes.cardContent}>
          <Grid container spacing={3}>
            <Grid item md={4} sm={6} xs={12}>
              <TextField
                fullWidth
                label="Seller's Name"
                id="sellerName"
                variant="outlined"
                name="name"
                value={sellerDetails.name.value}
                onChange={(e) =>
                  handleChange("name", { value: e.target.value })
                }
                onBlur={(e) =>
                  handleDispatch("name", { value: e.target.value })
                }
                error={
                  postAdSD &&
                  postAdSD.name && postAdSD.name.error
                    ? postAdSD.name.error
                    : sellerDetails.name.error
                }
                helperText={
                  postAdSD &&
                  postAdSD.name && postAdSD.name.error
                    ? postAdSD.name.errorText
                    : sellerDetails.name.errorText
                }
                // error={sellerDetails.name.error}
                // helperText={sellerDetails.name.errorText}
                required
              />
            </Grid>

            <Grid item md={4} sm={6} xs={12}>
              <TextField
                fullWidth
                label="Seller's Phone"
                id="sellerPhNum"
                variant="outlined"
                name="phone_number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
                value={sellerDetails.phone_number.value}
                onChange={(e) =>
                  handleChange("phone_number", { value: e.target.value })
                }
                onBlur={(e) =>
                  handleDispatch("phone_number", { value: e.target.value })
                }
                error={
                  postAdSD &&
                  postAdSD.phone_number && postAdSD.phone_number.error
                    ? postAdSD.phone_number.error
                    : sellerDetails.phone_number.error
                }
                helperText={
                  postAdSD &&
                  postAdSD.phone_number && postAdSD.phone_number.error
                    ? postAdSD.phone_number.errorText
                    : sellerDetails.phone_number.errorText
                }
                required
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <TextField
                fullWidth
                label="Seller's Email"
                id="sellerEmail"
                variant="outlined"
                name="email"
                type="email"
                value={sellerDetails.email.value}
                onChange={(e) =>
                  handleChange("email", { value: e.target.value })
                }
                onBlur={(e) =>
                  handleDispatch("email", { value: e.target.value })
                }
                error={
                  postAdSD && postAdSD.email && postAdSD.email.error
                    ? postAdSD.email.error
                    : sellerDetails.email.error
                }
                helperText={
                  postAdSD && postAdSD.email && postAdSD.email.error
                    ? postAdSD.email.errorText
                    : sellerDetails.email.errorText
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="sellerNotes"
                label="Seller's Additional Notes about your Vehicle - ex: Excellent condition, No accidents, Must see"
                multiline
                rows={5}
                value={sellerDetails.seller_notes.value}
                variant="outlined"
                onChange={(e) =>
                  handleChange("seller_notes", { value: e.target.value })
                }
                onBlur={(e) =>
                  handleDispatch("seller_notes", { value: e.target.value })
                }
                error={
                  postAdSD &&
                  postAdSD.seller_notes && postAdSD.seller_notes.error
                    ? postAdSD.seller_notes.error
                    : sellerDetails.seller_notes.error
                }
                helperText={
                  postAdSD &&
                  postAdSD.seller_notes && postAdSD.seller_notes.error
                    ? postAdSD.seller_notes.errorText
                    : sellerDetails.seller_notes.errorText
                }
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          {/* <Typography className={classes.submit}>
                            <Button
                                color="primary"
                                variant="contained"
                                // onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Typography> */}
        </Box>
      </Card>
    </Container>
  );
};

export default PostSellerDetails;
