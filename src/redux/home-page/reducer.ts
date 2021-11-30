import { combineReducers } from "redux";

import * as actions from "./actions";

export interface IHomePageState {
  rewardsList: any[];
  loansList: any[];
  belongingsList: any[];
}

const reducer = combineReducers<IHomePageState>({
  rewardsList(state = [], action) {
    switch (action.type) {
      case actions.GET_REWARDS:
        return action.payload;
      default:
        return state;
    }
  },

  loansList(state = [], action) {
    switch (action.type) {
      case actions.GET_LOANS:
        return action.payload;
      default:
        return state;
    }
  },

  belongingsList(state = [], action) {
    switch (action.type) {
      case actions.GET_BELONGINGS:
        return action.payload;
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
