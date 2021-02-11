import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import NavMenu from "../components/Layouts/NavMenu";
import Footer from "../components/Layouts/Footer";

export function PrivateRoute({ component: Component, roles, ...props }) {
  const user = localStorage.getItem("slc_user");
  console.log("(fileName)========================== user @private route", user);

  return (
    <Route
      {...props}
      render={(innerProps) =>
        user ? (
          <div>
            <NavMenu />
            <Component {...innerProps} />
            <Footer />
          </div>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
