import { combineReducers } from "redux";

import * as actions from "./actions";

import { IQuote } from "src/interfaces/InstantQuote.interface";
import { IOrder } from "src/interfaces/Payment.interface";

export interface IQuotesState {
  quotesList: IQuote[];
  quotesFilterList: IQuote[];
  quote: IQuote;
  insertCollateralItemsSuccess: boolean;
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  submitSuccess: string;
  frEnrollSuccess: string;
  order: IOrder;
  onFilterChange: any;
  onQuoteSearchFilterChange: any;
}

const reducer = combineReducers<IQuotesState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.SUBMIT_LOAN_SUCCESS:
        //success means not loading
        return false;
      case actions.SUBMIT_LOAN_FAILURE:
        //failure means not loading
        return false;
      case actions.SUBMIT_LOAN_REQUEST:
        //request means loading is true as some backend call is happenning
        return true;
      case actions.QUOTES_LIST_SUCCESS:
        return false;
      case actions.QUOTES_LIST_FAILURE:
        return false;
      case actions.QUOTES_LIST_REQUEST:
        return true;
      case actions.QUOTE_SUCCESS:
        return false;
      case actions.QUOTE_FAILURE:
        return false;
      case actions.APPROVE_QUOTE_REQUEST:
        return true;
      case actions.APPROVE_QUOTE_SUCCESS:
        return false;
      case actions.APPROVE_QUOTE_FAILURE:
        return false;
      case actions.QUOTE_REQUEST:
        return true;
      case actions.INSPECTION_COMPLETE_SUCCESS:
        return false;
      case actions.INSPECTION_COMPLETE_FAILURE:
        return false;
      case actions.INSPECTION_COMPLETE_REQUEST:
        return true;
      case actions.REJECT_QUOTE_REQUEST:
        return true;
      case actions.REJECT_QUOTE_SUCCESS:
        return false;
      case actions.REJECT_QUOTE_FAILURE:
        return false;
      case actions.FR_ENROLLMENT_REQUEST:
        return true;
      case actions.FR_ENROLLMENT_SUCCESS:
        return false;
      case actions.FR_ENROLLMENT_FAILURE:
        return false;
      case actions.QUOTES_FILTER_LIST_SUCCESS:
        return false;
      case actions.QUOTES_FILTER_LIST_FAILURE:
        return false;
      case actions.QUOTES_FILTER_LIST_REQUEST:
        return true;
      default:
        return state;
    }
  },

  quotesList(state: IQuote[] = [], action): IQuote[] {
    switch (action.type) {
      case actions.QUOTES_LIST_SUCCESS:
        return action.data;
      case actions.QUOTES_LIST_FAILURE:
        return [];
      case actions.QUOTES_FILTER_LIST_SUCCESS:
        return action.data;
      case actions.QUOTES_FILTER_LIST_FAILURE:
        return [];
      default:
        return state;
    }
  },
  quotesFilterList(state: IQuote[] = [], action): IQuote[] {
    switch (action.type) {
      case actions.QUOTES_FILTER_LIST_SUCCESS:
        return action.data;
      case actions.QUOTES_FILTER_LIST_FAILURE:
        return [];
      default:
        return state;
    }
  },
  total(state = 0, action) {
    switch (action.type) {
      case actions.QUOTES_LIST_SUCCESS:
        return action.data.length;
      default:
        return state;
    }
  },
  page(state = 1, action) {
    switch (action.type) {
      case actions.CHANGE_PAGE:
        return action.page;
      default:
        return state;
    }
  },
  pageSize(state = 10, action) {
    switch (action.type) {
      case actions.CHANGE_PAGE_SIZE:
        return action.pageSize;
      default:
        return state;
    }
  },
  quote(state = {}, action) {
    switch (action.type) {
      case actions.QUOTE_SUCCESS:
        return action.data;
      case actions.SUBMIT_LOAN_SUCCESS:
        console.log(
          "in reducer.............for SUBMIT_LOAN_SUCCESS",
          action.data,
          action.data.loan
        );
        if (typeof action.data["loan"] === "undefined") {
          console.log("returning action.data");
          return action.data;
        } else {
          console.log("returning action.data.loan");
          return action.data.loan;
        }
      case actions.APPROVE_QUOTE_REQUEST:
        return {};
      case actions.APPROVE_QUOTE_SUCCESS:
        //console.log("action data", action.data);
        return action.data;
      case actions.INSPECTION_COMPLETE_SUCCESS:
        //console.log("action data inspection", action.data);
        return action.data;
      case actions.REJECT_QUOTE_REQUEST:
        return {};
      case actions.REJECT_QUOTE_SUCCESS:
        //console.log("action data", action.data);
        return action.data;
      case action.RESET_LOAN:
        return {};
      case actions.QUOTE_FAILURE:
        return {};
      case actions.INSPECTION_COMPLETE_REQUEST:
        return {};
      default:
        return state;
    }
  },
  insertCollateralItemsSuccess(state = false, action) {
    switch (action.type) {
      case actions.INSERT_COLLATERALITEMS_TO_LOAN_SUCCESS:
        return true;
      case actions.INSERT_COLLATERALITEMS_TO_LOAN_FAILURE:
        return false;
      case actions.INSERT_COLLATERALITEMS_TO_LOAN_REQUEST:
        return false;
      default:
        return state;
    }
  },
  submitSuccess(state = "", action) {
    switch (action.type) {
      case actions.APPROVE_QUOTE_SUCCESS:
        return "YES";
      case actions.APPROVE_QUOTE_FAILURE:
        return "NO";
      case actions.REJECT_QUOTE_SUCCESS:
        return "YES";
      case actions.REJECT_QUOTE_FAILURE:
        return "NO";
      case actions.INSPECTION_COMPLETE_SUCCESS:
        return "YES";
      case actions.INSPECTION_COMPLETE_FAILURE:
        return "NO";
      case actions.QUOTE_SUCCESS:
        return "";
      case actions.SUBMIT_LOAN_FAILURE:
        return "NO";
      case actions.SUBMIT_LOAN_REQUEST:
        return "REQUESTED";
      case actions.RESET_SUBMIT_SUCCESS:
        return "";
      default:
        return state;
    }
  },
  frEnrollSuccess(state = "", action) {
    switch (action.type) {
      case actions.FR_ENROLLMENT_SUCCESS:
        return "YES";
      case actions.FR_ENROLLMENT_FAILURE:
        return "NO";
      default:
        return state;
    }
  },
  order(state = {}, action) {
    switch (action.type) {
      case actions.SUBMIT_LOAN_SUCCESS:
        // return action.data.order;
        return state;
      default:
        return state;
    }
  },
  onFilterChange(state = {}, action) {
    switch (action.type) {
      case actions.QUOTES_FILTER_CHANGE:
        return action.payload;
      default:
        return state;
    }
  },
  onQuoteSearchFilterChange(state = {}, action) {
    switch (action.type) {
      case actions.QUOTE_SEARCH_FILTER_CHANGE:
        return action.payload;
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
