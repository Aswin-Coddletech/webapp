import { combineReducers } from "redux";

import * as actions from "./actions";

import { IShop } from "src/interfaces/Shop.interface";

export interface IShopState {
  shopList: IShop[];
  loading: boolean;
  shop: IShop;
}

const reducer = combineReducers<IShopState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.SHOP_DATA_REQUEST:
        return true;
      case actions.SHOP_DATA_SUCCESS:
        return false;
      case actions.SHOP_DATA_FAILURE:
        return false;
      default:
        return state;
    }
  },
  shopList(state: IShop[] = [], action): IShop[] {
    // let val = Object(action.data)
    // console.log('****Shop reducer data : ', val['list'])
    // console.log('*****Type of action.data',typeof action.data)
    switch (action.type) {
      case actions.SHOP_DATA_SUCCESS:
        // console.log('*****Type of action.data',typeof action.data['list'])
        return action.data;
      case actions.SHOP_DATA_FAILURE:
        return [];
      default:
        return state;
    }
  },
  shop(state = {}, action) {
    switch (action.type) {
      case action.SHOP_SUCCESS:
        return action.data[0];
      case action.SHOP_FAILURE:
        return {};
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
