import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from "react-router";

export function PrivateRoute({ component: Component, roles, ...props }) {
    const user = localStorage.getItem('slc_user');
    return (
        <Route {...props} render={innerProps =>
            user ? (
                <Component {...innerProps} />
            ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
        }
        />
    );
}

