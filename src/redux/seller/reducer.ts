import { combineReducers } from "redux";

import * as actions from "./actions";

import { ISeller } from "src/interfaces/Seller.interface";

export interface ISellerState {
  sellerList: ISeller[];
  seller: ISeller;
  loading: boolean;
}

const reducer = combineReducers<ISellerState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.SELLER_DATA_REQUEST:
        return true;
      case actions.SELLER_DATA_SUCCESS:
        return false;
      case actions.SELLER_DATA_FAILURE:
        return false;
      default:
        return state;
    }
  },
  sellerList(state: ISeller[] = [], action): ISeller[] {
    //console.log('****Reduce', action.data)
    switch (action.type) {
      case actions.SELLER_DATA_SUCCESS:
        return action.data;
      case actions.SELLER_DATA_FAILURE:
        return [];
      default:
        return state;
    }
  },
  seller(state = {}, action) {
    console.log("****Seller Reduce", action.data);
    switch (action.type) {
      case actions.SELLER_DATA_SUCCESS:
        return action.data[0];
        console.log("Seller based on Id = ", action.data[0]);
      case actions.SELLER_DATA_FAILURE:
        return [];
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
