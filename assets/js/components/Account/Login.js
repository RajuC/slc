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
  InputAdornment
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { userActions } from "../../actions";
// import { useHistory } from 'react-router-dom';
import { validationService } from "../../services/validationService";
import { Alert } from "@material-ui/lab";
import CustomButton from "../Layouts/CustomButton";
// import Page from "../Layouts/Page";
// import Logo from 'src/components/Logo';
// import useAuth from 'src/hooks/useAuth';
// import Auth0Login from './Auth0Login';
// import FirebaseAuthLogin from './FirebaseAuthLogin';
// import JWTLogin from './JWTLogin';

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
    // minHeight: "100vh",
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
  cardContainer: {
    paddingBottom: 40,
    paddingTop: 40,
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

const Login = () => {
  const classes = useStyles();

  const [loginDetails, setLoginDetails] = useState({
    loginId: valObj,
    password: valObj,
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

//   useEffect(() => {
//     console.log("(Login)==========================useEffect", alert);
//     // if (alert && alert.error) {
//     setOpen(false);
//     // }
//   }, [alert]);

//   console.log(
//     "(Login)==========================open",
//     open,
//     "login details",
//     loginDetails
//   );


  const handleClickShowPassword = () => {
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
    let newData = "";
    if (data && data.value) {
      newData = updateValObjWithVal(data);
    } else {
      newData = updateValObjWithError(`${key} ${mandatoryText}!`);
    }

    setLoginDetails({
      ...loginDetails,
      [key]: newData,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let validationResult = validationService.validateLoginUserDetails(
      loginDetails
    );
    if (validationResult.isValid) {
      console.log("Success Validation Ready to Login");
      let loginObj = {};
      const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/;

      const result = pattern.test(loginDetails.loginId.value);
      console.log(
        "(login handleSubmit)========================== result",
        loginDetails.loginId.value,
        " - ",
        result
      );
      if (result === true) {
        dispatch(
          userActions.login(
            {
              ...loginObj,
              email: loginDetails.loginId.value,
              password: loginDetails.password.value,
            },
            "/"
          )
        );
      } else {
        dispatch(
          userActions.login(
            {
              ...loginObj,
              login_id: loginDetails.loginId.value,
              password: loginDetails.password.value,
            },
            "/"
          )
        );
      }
    } else {
      console.log(
        " login failed Validation!!!!!!!!!!!!!",
        validationResult.loginErrorVals
      );
      setLoginDetails(validationResult.loginErrorVals);
      //   dispatch(userActions.addUserRegisterValidations(validationResult.registerErrorVals));
      //   dispatch(alertActions.error("Please check all the fields!!"));
    }
  };

  return (
    <div className={classes.root} title="Login">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Box mt={4} display="flex" justifyContent="center">
          {/* <RouterLink to="/login"> */}
          <Typography color="textPrimary" gutterBottom variant="h5">
            Sri Laxmi Cars Portal
          </Typography>

          {/* </RouterLink> */}
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
              <div>
                <Typography color="textPrimary" gutterBottom variant="h5">
                  Sign in
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sign in on the internal platform
                </Typography>
              </div>
            </Box>
            <Box flexGrow={1} mt={3}>
              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  // error={Boolean(touched.email && errors.email)}
                  fullWidth
                  autoFocus
                  // helperText={touched.email && errors.email}
                  label="Login Id"
                  margin="normal"
                  name="loginId"
                  type="text"
                  onChange={(e) =>
                    handleChange("loginId", { value: e.target.value })
                  }
                  value={loginDetails.loginId.value}
                  error={loginDetails.loginId.error}
                  helperText={loginDetails.loginId.errorText}
                  variant="outlined"
                  required
                />

                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  fullWidth
                  variant="outlined"
                  required
                >
                  <InputLabel htmlFor="post-login-pwd">Password</InputLabel>
                  <OutlinedInput
                    id="post-login-pwd"
                    type={showPassword ? "text" : "password"}
                    value={loginDetails.password.value}
                    name="password"
                    onChange={(e) =>
                      handleChange("password", { value: e.target.value })
                    }
                    error={loginDetails.password.error}
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
                <Box mt={2}>
                  <CustomButton
                    color="primary"
                    //   disabled={isSubmitting}
                    fullWidth
                    size="small"
                    type="submit"
                    variant="contained"
                  >
                    Log In
                  </CustomButton>
                </Box>
                <Box mt={2}>
                  <Alert severity="info">
                    <div>
                      Use <b>rajj_jay</b> and password <b>password123</b>
                    </div>
                  </Alert>
                </Box>
              </form>
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Button color="inherit" size="small" variant="outlined" href="/" fullWidth={false}>Back to Home</Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
