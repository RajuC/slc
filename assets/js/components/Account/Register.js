import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  Tooltip,
  Typography,
  makeStyles,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { userActions } from "../../actions";
import { validationService } from "../../services/validationService";
import { Alert } from "@material-ui/lab";
import CustomButton from "../Layouts/CustomButton";
// import Page from "../Layouts/Page";

const user = { name: "raju", avatar: "NA", tier: "premium" };
const valObj = { value: "", error: false, errorText: "" };
const mandatoryText = "field cannot be empty";

// const methodIcons = {
//   'Auth0': '/static/images/auth0.svg',
//   'FirebaseAuth': '/static/images/firebase.svg',
//   'JWT': '/static/images/jwt.svg'
// };

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  bannerChip: {
    marginRight: theme.spacing(2),
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "75%",
    marginLeft:"15%"
  },
  cardContainer: {
    // paddingBottom: 40,
    paddingTop: 20,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    minHeight: 400,
  },
  currentMethodIcon: {
    height: 40,
    "& > img": {
      width: "auto",
      maxHeight: "100%",
    },
  },
}));

const Register = () => {
  console.log("(fileName)========================== Register Component");
  const classes = useStyles();
  // const { method } = useAuth();

  const [registerDetails, setRegisterDetails] = useState({
    name: valObj,
    login_id: valObj,
    email: valObj,
    password: valObj,
    role: valObj,
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  //   const alert = useSelector((state) => state.alert);

  //   useEffect(() => {
  //     console.log("(Login)==========================useEffect", alert);
  //     // if (alert && alert.error) {
  //     setOpen(false);
  //     // }
  //   }, [alert]);

  const arrayToObject = (array) =>
    array.reduce((o, item) => {
      let newObj = new Object();
      newObj["title"] = item + "";
      newObj["value"] = item + "";
      return o.concat(newObj);
    }, []);

  const getConditions = () => {
    let condsArr = ["user", "admin", "super_admin"];
    return arrayToObject(condsArr);
  };

  console.log(
    "(Register)==========================registerDetails",
    registerDetails
  );

  const handleClickShowPassword = () => {
    console.log("handleClickShowPassword ===========");
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    let userDetails = "";
    if (data && data.value) {
      userDetails = updateValObjWithVal(data);
    } else {
      userDetails = updateValObjWithError(`${key} ${mandatoryText}!`);
    }

    setRegisterDetails({
      ...registerDetails,
      [key]: userDetails,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("(handleSubmit)========================== ", registerDetails);
    let validationResult = validationService.validateRegisterUserDetails(
      registerDetails
    );
    if (validationResult.isValid) {
      console.log("Success Validation Ready to register");
      let userObj = Object.assign(
        {},
        ...Object.entries(user).map(([k, v]) => ({ [k]: v.value }))
      );
      console.log("(userObj)==========================userObj ", userObj);
      dispatch(userActions.register({ user: userObj }, "/dashboard"));
    } else {
      console.log(" register failed Validation!!!!!!!!!!!!!");
      setRegisterDetails(validationResult.registerErrorVals);
      //   dispatch(userActions.addUserRegisterValidations(validationResult.registerErrorVals));
      //   dispatch(alertActions.error("Please check all the fields!!"));
    }
  };

  return (
    <div className={classes.root} title="Register">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Box mt={4} display="flex" justifyContent="center">
          {/* <RouterLink to="/login"> */}
          <Typography color="textPrimary" gutterBottom variant="h5">
            Register a new user
          </Typography>

          {/* </RouterLink> */}
        </Box>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            {/* <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography color="textPrimary" gutterBottom variant="h2">
                  Sign Up
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Register to the internal platform
                </Typography>
              </div>
            </Box> */}
            <Box flexGrow={1} mt={2}>
              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  // error={Boolean(touched.email && errors.email)}
                  fullWidth
                  autoFocus
                  // helperText={touched.email && errors.email}
                  label="Full Name"
                  margin="normal"
                  name="name"
                  type="text"
                  size="small"
                  onChange={(e) =>
                    handleChange("name", { value: e.target.value })
                  }
                  value={registerDetails.name.value}
                  error={registerDetails.name.error}
                  helperText={registerDetails.name.errorText}
                  variant="outlined"
                  required
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  margin="normal"
                  id="email"
                  label="Email Id"
                  name="email"
                  size="small"
                  // autoComplete="email"
                  onChange={(e) =>
                    handleChange("email", { value: e.target.value })
                  }
                  value={registerDetails.email.value}
                  error={registerDetails.email.error}
                  helperText={registerDetails.email.errorText}
                />
                <TextField
                  // error={Boolean(touched.email && errors.email)}
                  fullWidth
                  autoFocus
                  // helperText={touched.email && errors.email}
                  label="Login Id"
                  margin="normal"
                  name="login_id"
                  type="text"
                  size="small"
                  onChange={(e) =>
                    handleChange("login_id", { value: e.target.value })
                  }
                  value={registerDetails.login_id.value}
                  error={registerDetails.login_id.error}
                  helperText={registerDetails.login_id.errorText}
                  variant="outlined"
                  required
                />
                <Autocomplete
                  id="role"
                  onChange={(event, data) => {
                    console.log(
                      "(Autocomplete)========================== role data",
                      data
                    );
                    handleChange("role", data);
                  }}
                  options={getConditions()}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      label="Role"
                      size="small"
                      error={registerDetails.role.error}
                      //   error={(postAd.condition && postAd.condition.error) ? postAd.condition.error : carDetails.condition.error}
                      helperText={registerDetails.role.errorText}
                      // helperText={(postAd.condition && postAd.condition.error) ? postAd.condition.errorText : carDetails.condition.errorText}
                      variant="outlined"
                      required
                    />
                  )}
                />
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  fullWidth
                  variant="outlined"
                  required
                  margin="normal"
                  size="small"
                >
                  <InputLabel htmlFor="post-login-pwd">Password</InputLabel>
                  <OutlinedInput
                    id="post-login-pwd"
                    type={showPassword ? "text" : "password"}
                    value={registerDetails.password.value}
                    name="password"
                    onChange={(e) =>
                      handleChange("password", { value: e.target.value })
                    }
                    error={registerDetails.password.error}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
                {/* {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )} */}
                <Box mt={6}>
                  <CustomButton
                    // color="secondary"
                    //   disabled={isSubmitting}
                    fullWidth
                    size="small"
                    type="submit"
                    variant="contained"
                  >
                    Register
                  </CustomButton>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
