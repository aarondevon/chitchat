/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem('token');
  let isAuthenticated = false;
  if (token) {
    isAuthenticated = true;
  }

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated
          ? children
          : <Redirect to="/" />;
      }}
    />
  );
}

export default PrivateRoute;
