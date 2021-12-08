export const prefix = "cognito";

export const CAUGHT_LOGIN_CALLBACK = `${prefix}/CAUGHT_LOGIN_CALLBACK`;

export const caughtLoginCallback = (data: any) => ({
  data,
  type: CAUGHT_LOGIN_CALLBACK
});
