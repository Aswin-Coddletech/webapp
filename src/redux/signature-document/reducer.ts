import { combineReducers } from "redux";

import * as actions from "./actions";

import { IQuote } from "src/interfaces/InstantQuote.interface";

export interface ISignatureDocumentState {
  quotesList: IQuote[];
  quote: IQuote;
  loading: boolean;
}

const reducer = combineReducers<ISignatureDocumentState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.QUOTEDOCUMENT_LIST_SUCCESS:
        return false;
      case actions.QUOTEDOCUMENT_LIST_FAILURE:
        return false;
      case actions.QUOTEDOCUMENT_LIST_REQUEST:
        return true;
      case actions.QUOTE_SUCCESS:
        return false;
      case actions.QUOTE_FAILURE:
        return false;
      case actions.QUOTE_REQUEST:
        return true;
      default:
        return state;
    }
  },

  quotesList(state: IQuote[] = [], action): IQuote[] {
    switch (action.type) {
      case actions.QUOTEDOCUMENT_LIST_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },

  quote(state = {}, action) {
    switch (action.type) {
      case actions.QUOTE_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },
});

export default { [actions.prefix]: reducer };
