import { combineReducers } from "redux";

import {
  LOGOUT,
  CHANGE_TOKENS,
  NEWTOKENS_SUCCESS,
  prefix,
  CHANGE_LANGUAGE,
} from "./actions";

import { CAUGHT_LOGIN_CALLBACK } from "src/redux/cognito/actions";

export interface IProfileState {
  loading?: boolean;
  idToken?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: string;
  tokenType?: string;
  userId?: string;
  userEmail?: string;
  orgId?: string;
  auth_time_millisec?: number;
  id_token_exp_time_millisec?: number;
  access_token_exp_time_millisec?: number;
  refresh_token_exp_time_millisec?: number;
  language: any;
}

const reducer = combineReducers<IProfileState>({
  loading(state = false, action) {
    switch (action.type) {
      case action.NEWTOKENS_SUCCESS:
      case action.NEWTOKENS_FAILURE:
        return false;
      case action.NEWTOKENS_REQUEST:
        return true;
      default:
        return state;
    }
  },
  idToken(state = (localStorage.getItem("token") as any) as string, action) {
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        return action.data.id_token;
      case CHANGE_TOKENS:
        //console.log('in profile reducer idtoken CHANGE_TOKENS');
        //console.log('in profile reducer idtoken CHANGE_TOKENS value is', action.payload.id_token ? 'notnull': null);
        return action.payload.id_token;
      case NEWTOKENS_SUCCESS:
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS');
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS value is', action.data.id_token ? 'notnull': null);
        return action.data.id_token;
      case LOGOUT:
        return null;
      default:
        //console.log('in profile reducer. returning id token from state. its value is', state  ? 'notnull': null);
        return state;
    }
  },
  accessToken(
    state = (localStorage.getItem("access_token") as any) as string,
    action
  ) {
    //we are not using access_token, hence not stored in lccalStorage
    //this will change when we want to use access_token
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        return action.data.access_token;
      case CHANGE_TOKENS:
        //console.log('in profile reducer accesstoken CHANGE_TOKENS');
        return action.payload.access_token;
      case NEWTOKENS_SUCCESS:
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS');
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS value is', action.data.access_token  ? 'notnull': null);
        return action.data.access_token;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },
  refreshToken(
    state = (localStorage.getItem("refresh_token") as any) as string,
    action
  ) {
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        //console.log("In login callback, saving refersh token ", action.data.refresh_token  ? 'notnull': null);
        return action.data.refresh_token;
      case LOGOUT:
        return null;
      default:
        //console.log('in profile reducer. returning refresh token from state. its value is', state ? 'notnull': null);
        return state;
    }
  },
  expiresIn(state = (null as any) as string, action) {
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        return action.data.expires_in;
      case CHANGE_TOKENS:
        return action.payload.expires_in;
      case NEWTOKENS_SUCCESS:
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS');
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS value is', action.data.expires_in);
        return action.data.expires_in;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },
  tokenType(state = (null as any) as string, action) {
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        return action.data.token_type;
      case CHANGE_TOKENS:
        return action.payload.token_type;
      case NEWTOKENS_SUCCESS:
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS');
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS value is', action.data.token_type);
        return action.data.token_type;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },
  userId(state = (localStorage.getItem("userId") as any) as string, action) {
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        return action.data.userId;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },
  userEmail(
    state = (localStorage.getItem("userEmail") as any) as string,
    action
  ) {
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        console.log(
          "userEmail redux profile reducer on CAUGHT_LOGIN_CALLBACK",
          action.data.userEmail
        );
        return action.data.userEmail;
      case CHANGE_TOKENS:
        if (typeof action.payload["userEmail"] !== "undefined") {
          return action.payload.userEmail;
        } else {
          return state;
        }
      case NEWTOKENS_SUCCESS:
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS');
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS value is', action.data.userEmail);
        return action.data.userEmail;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },
  orgId(state = localStorage.getItem("orgId") as string, action) {
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        return action.data.orgId;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },
  auth_time_millisec(
    state = (localStorage.getItem("auth_time_millisec") as any) as number,
    action
  ) {
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        return action.data.auth_time_millisec;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },
  id_token_exp_time_millisec(
    state = (localStorage.getItem(
      "id_token_exp_time_millisec"
    ) as any) as number,
    action
  ) {
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        return action.data.id_token_exp_time_millisec;
      case CHANGE_TOKENS:
        return action.payload.id_token_exp_time_millisec;
      case NEWTOKENS_SUCCESS:
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS');
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS value is', action.data.id_token_exp_time_millisec);
        return action.data.id_token_exp_time_millisec;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },
  refresh_token_exp_time_millisec(
    state = (localStorage.getItem(
      "refresh_token_exp_time_millisec"
    ) as any) as number,
    action
  ) {
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        return action.data.refresh_token_exp_time_millisec;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },
  access_token_exp_time_millisec(state = (null as any) as number, action) {
    // we are not using access token, hence not saved in local storage
    // need to change this when we will use access token
    switch (action.type) {
      case CAUGHT_LOGIN_CALLBACK:
        return action.data.access_token_exp_time_millisec;
      case CHANGE_TOKENS:
        return action.payload.access_token_exp_time_millisec;
      case NEWTOKENS_SUCCESS:
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS');
        //console.log('in profile reducer idtoken NEWTOKENS_SUCCESS value is', action.data.access_token_exp_time_millisec);
        return action.data.access_token_exp_time_millisec;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },
  language(state = (process.env.REACT_APP_DEFAULT_LANG as any) as any, action) {
    switch (action.type) {
      case CHANGE_LANGUAGE:
        return action.language;
      default:
        return state;
    }
  },
});

export default { [prefix]: reducer };
