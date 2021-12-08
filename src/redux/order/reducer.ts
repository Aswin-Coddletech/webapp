import { combineReducers } from "redux";

import * as actions from "./actions";

import { IOrder } from "src/interfaces/Order.interface";

export interface IOrderState {
  orderList: IOrder[];
  loading: boolean;
  order: IOrder;
}

const reducer = combineReducers<IOrderState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.ORDER_DATA_REQUEST:
        return true;
      case actions.ORDER_DATA_SUCCESS:
        return false;
      case actions.ORDER_DATA_FAILURE:
        return false;
      default:
        return state;
    }
  },
  orderList(state: IOrder[] = [], action): IOrder[] {
    //console.log('****Reduce', action.data)
    switch (action.type) {
      case actions.ORDER_DATA_SUCCESS:
        return action.data;
      case actions.ORDER_DATA_FAILURE:
        return [];
      default:
        return state;
    }
  },
  order(state = {}, action) {
    console.log("~~~~Order data based on Id : ", action.data);
    switch (action.type) {
      case actions.ORDER_SUCCESS:
        return action.data[0];
      case actions.ORDER_FAILURE:
        return {};
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
