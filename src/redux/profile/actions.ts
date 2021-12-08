export const prefix = "profile";

export const LOGIN = `${prefix}/LOGIN`;

export const login = () => ({ type: LOGIN });

export const LOGOUT = `${prefix}/LOGOUT`;

export const logout = () => ({ type: LOGOUT });

export const SIGNUP = `${prefix}/SIGNUP`;

export const signup = () => ({ type: SIGNUP });

export const CHANGE_TOKENS = `${prefix}/CHANGE_TOKENS`;
export const changetokens = (newTokenData: any) => ({
  type: CHANGE_TOKENS,
  payload: newTokenData
});

export const NEWTOKENS_REQUEST = `${prefix}/NEWTOKENS_REQUEST`;
export const NEWTOKENS_SUCCESS = `${prefix}/NEWTOKENS_SUCCESS`;
export const NEWTOKENS_FAILURE = `${prefix}/NEWTOKENS_FAILURE`;
export const fetchNewTokens = () => ({
  promise: (api: any) => api.auth.newtokens(),
  types: [NEWTOKENS_REQUEST, NEWTOKENS_SUCCESS, NEWTOKENS_FAILURE]
});
export const CHANGE_LANGUAGE = `${prefix}/CHANGE_LANGUAGE`;
export const changeLanguage = (language: any) => ({
  type: CHANGE_LANGUAGE,
  language
});
