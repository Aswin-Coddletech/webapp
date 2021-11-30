import * as actions from "./actions";

export interface ICognitoAuth {
  [key: string]: any;
}

const reducer = (state = {}, action): ICognitoAuth => {
  switch (action.type) {
    case actions.CAUGHT_LOGIN_CALLBACK:
      console.log("In cognito reducer.ts action.data:", action.data);
      return action.data;
    default:
      return state;
  }
};

export default { [actions.prefix]: reducer };
