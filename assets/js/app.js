import React, { useEffect } from "react";
import { Router } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { render } from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

// import { alertActions } from './actions/alertActions';
import { PrivateRoute } from "./helpers/privateRoute";
import { store } from "./helpers/store";
import { history } from "./helpers/history";
// import Inventory from './components/Inventory';
// import { LoginPage } from '../LoginPage';
// import { RegisterPage } from '../RegisterPage';

import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
// import Register from './components/Account/Register';
import Home from "./components/Home";
import HomePage from "./components/Home/HomePage";
import NavMenu from "./components/Layouts/NavMenu";
import NotFound from "./components/Layouts/NotFound";
import Footer from "./components/Layouts/Footer";
// import MainAd from './components/Inventory/MainAd';
import PostAd from "./components/PostAd";
import AddEditListing from "./components/AddEditListing";
import AllAds from "./components/Ads/AllAds";
import { makeStyles } from "@material-ui/core/styles";
import ActiveAds from "./components/Ads/ActiveAds";
import MainAd from "./components/Ads/MainAd";
// import Account from './components/Account';
import "../css/app.css";
import SideBar from "./components/Ads/ActiveAds/SideBar";


const useStyles = makeStyles((theme) => ({
  // alert: {
  //     width: '50%',
  //     '& > * + *': {
  //         marginTop: theme.spacing(2),
  //     }
  // },
}));
const rootElement = document.getElementById("root");

const App = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  // useEffect(() => {
  //     history.listen((location, action) => {
  //         // clear alert on location change
  //         dispatch(alertActions.clear());
  //     });
  // }, []);

  return (
    <div>
      <Router history={history}>
        {/* <NavMenu /> */}
        <Switch>
          <Route exact path="/">
            <NavMenu />
            <Home />
            <Footer />
          </Route>
          <Route exact path="/login">
            <NavMenu />
            <Login />
            <Footer />
          </Route>
          <Route exact path="/listings/:ads_type">
            <ActiveAds />
          </Route>
          <Route exact path="/sideBar">
            <SideBar />
          </Route>
          <Route exact path="/404">
            <NavMenu />
            <NotFound />
            <Footer />
          </Route>
          <PrivateRoute component={PostAd} path="/postAd" exact />
          <PrivateRoute component={AllAds} path="/listings" exact />
          <PrivateRoute component={Register} path="/register" exact />
          <PrivateRoute component={AddEditListing} path="/listing/:id/edit" exact />
          <PrivateRoute component={MainAd} path="/listing/:id/view" exact />
          <PrivateRoute component={AddEditListing} path="/post/listing" exact />
          {/* <PrivateRoute component={MainAd} path="/listing/:id" exact /> */}

          {/* <PrivateRoute exact path="/home">
                        <HomePage />
                    </PrivateRoute> */}
          {/* <Route exact path="/inventory/all">
                        <Inventory type="cars" />
                    </Route>
                    <Route exact path="/inventory/cars">
                        <Inventory type="cars" />
                    </Route>
                    <Route exact path="/inventory/bikes">
                        <Inventory type="bikes" />
                    </Route>
                    <Route exact path="/ad">
                        <MainAd />
                    </Route>
                    <Route exact path="/postad">
                        <PostAd />
                    </Route>
                    <Route exact path="/profile">
                        <Account />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route> */}
          <Redirect exact from="/listings/reload/bikes" to="/listings/bikes" />
          <Redirect exact from="/listings/reload/cars" to="/listings/cars" />
          <Redirect exact from="/listings/reload" to="/listings" />
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </div>
  );
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
