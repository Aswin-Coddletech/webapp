import jsonwebtoken from "jsonwebtoken";
import { createSelector } from "reselect";

import { prefix } from "./actions";

export const loadingSelector = (state) => state[prefix].loading;
export const idTokenSelector = (state) => state[prefix].idToken;
export const accessTokenSelector = (state) => state[prefix].accessToken;
export const refreshTokenSelector = (state) => state[prefix].refershToken;
export const expiresInSelector = (state) => state[prefix].expiresIn;
export const tokenTypeSelector = (state) => state[prefix].tokenType;

export const userIdSelector = (state) => state[prefix].userId;
export const userEmailSelector = (state) => state[prefix].userEmail;
export const orgIdSelector = (state) => state[prefix].orgId;

export const auth_time_millisecSelector = (state) =>
  state[prefix].auth_time_millisec;
export const id_token_exp_time_millisecSelector = (state) =>
  state[prefix].id_token_exp_time_millisec;
export const access_token_exp_time_millisecSelector = (state) =>
  state[prefix].access_token_exp_time_millisec;
export const refresh_token_exp_time_millisecSelector = (state) =>
  state[prefix].refresh_token_exp_time_millisec;

export const langSelector = (state) => state[prefix].language;
// const now = new Date();
// const current_time_millisec = now.getTime();
// if token expiry - current time < 5minutes, then unauthenticated else authenticated
// if token expiry - current time > 5minutes, then authenticated else unauthenticated
// 5minutes = 300sec = 300,000 milliseconds; Making in 15minutes

/* Selector with Time Claculations is IMPURE and not working correctly
export const isAuthenticated = createSelector(
  id_token_exp_time_millisecSelector,
  id_token_exp_time_millisec => (id_token_exp_time_millisec - (new Date()).getTime() > 900000) as Boolean,
);
*/

export const isAuthenticated = createSelector(idTokenSelector, Boolean);

/*  Selector with Time Claculations is IMPURE and not working correctly
export const isRefreshTokenValid = createSelector(
  refresh_token_exp_time_millisecSelector,
  refresh_token_exp_time_millisec => (refresh_token_exp_time_millisec > (new Date()).getTime()) as Boolean,
);
*/

export const roleSelector = () => "USER";

export const userSelector = createSelector(
  idTokenSelector,
  (idToken) => jsonwebtoken.decode(idToken) as { [key: string]: any }
);
