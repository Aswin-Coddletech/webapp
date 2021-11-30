import { combineReducers } from "redux";

import * as actions from "./actions";

export interface IUtilState {
  onFilterChange: any;
  onSearchFilterChange: any;
  onPaginationChange: any;
}

const reducer = combineReducers<IUtilState>({
  onFilterChange(state = {}, action) {
    switch (action.type) {
      case actions.FILTER_CHANGE:
        return action.payload;
      default:
        return state;
    }
  },
  onSearchFilterChange(state = {}, action) {
    switch (action.type) {
      case actions.SEARCH_FILTER_CHANGE:
        return action.payload;
      default:
        return state;
    }
  },
  onPaginationChange(state = {}, action) {
    switch (action.type) {
      case actions.ON_PAGINATION_CHANGE:
        return action.payload;
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
