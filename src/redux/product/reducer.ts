import { combineReducers } from "redux";

import * as actions from "./actions";

import { IProduct } from "src/interfaces/Product.interface";

export interface IProductState {
  productList: IProduct[];
  product: IProduct;
  loading: boolean;
}

const reducer = combineReducers<IProductState>({
  loading(state = false, action) {
    console.log("*** Product reducer data : ", action.data);
    switch (action.type) {
      case actions.PRODUCT_DATA_REQUEST:
        return true;
      case actions.PRODUCT_DATA_SUCCESS:
        return false;
      case actions.PRODUCT_DATA_FAILURE:
        return false;
      default:
        return state;
    }
  },
  productList(state: IProduct[] = [], action): IProduct[] {
    //console.log('****Reduce', action.data)
    console.log("~~~~Product Data : ", action.data);
    switch (action.type) {
      case actions.PRODUCT_DATA_SUCCESS:
        return action.data;
      case actions.PRODUCT_DATA_FAILURE:
        return [];
      default:
        return state;
    }
  },
  product(state = {}, action) {
    console.log("~~~~Product data based on Id : ", action.data);
    switch (action.type) {
      case actions.PRODUCT_SUCCESS:
        return action.data[0];
      case actions.PRODUCT_FAILURE:
        return {};
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
