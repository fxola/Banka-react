import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from '../services/checkAuth';
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin' }} />
        )
      }
    />
  );
};
