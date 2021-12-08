import React from "react";
import { Route } from "react-router-dom";

import { ROUTES } from "src/constants/routes";

export const PrivateRoute = ({
  component: Component,
  render,
  isAuthenticated,
  id_token_exp_time_millisec,
  refresh_token_exp_time_millisec,
  fetchNewTokens,
  ...rest
}) => {
  //console.log('in PrivateRoute isAuthenticated, refresh_token_exp_time_millisec', isAuthenticated, refresh_token_exp_time_millisec);
  let now = new Date().getTime();

  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated) {
          window.location.replace(ROUTES.LANDING_PAGE);
          return null;
        } else if (isAuthenticated && now >= refresh_token_exp_time_millisec) {
          window.location.replace(ROUTES.LANDING_PAGE);
          return null;
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};
