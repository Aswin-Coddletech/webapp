import { combineReducers } from "redux";

import * as actions from "./actions";

import { ICustomer } from "src/interfaces/Customer.interface";

export interface ICustomerState {
  customerList: ICustomer[];
  customer: ICustomer;
  loading: boolean;
  //page: number;
}

const reducer = combineReducers<ICustomerState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.CUSTOMER_DATA_REQUEST:
        return true;
      case actions.CUSTOMER_DATA_SUCCESS:
        return false;
      case actions.CUSTOMER_DATA_FAILURE:
        return false;
      default:
        return state;
    }
  },
  customerList(state: ICustomer[] = [], action): ICustomer[] {
    //console.log('****Reduce', action.data)
    switch (action.type) {
      case actions.CUSTOMER_DATA_SUCCESS:
        return action.data;
      case actions.CUSTOMER_DATA_FAILURE:
        return [];
      default:
        return state;
    }
  },
  customer(state = {}, action) {
    //console.log('****Reduce', action.data)
    switch (action.type) {
      case actions.CUSTOMER_SUCCESS:
        return action.data[0];
      case actions.CUSTOMER_FAILURE:
        return [];
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
