import { combineReducers } from "redux";

import * as actions from "./actions";

import { IInventory } from "src/interfaces/Inventory.interface";

export interface IUserItemsState {
  userItemsList: IInventory[];
  deviceLockList: IInventory[];
  userItem: IInventory;
  loading: boolean;
  lockActionSuccess: string;
}

const reducer = combineReducers<IUserItemsState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.USER_ITEMS_LIST_SUCCESS:
        return false;
      case actions.USER_ITEMS_LIST_FAILURE:
        return false;
      case actions.USER_ITEMS_LIST_REQUEST:
        return true;
      case actions.DEVICE_LOCK_LIST_SUCCESS:
        return false;
      case actions.DEVICE_LOCK_LIST_FAILURE:
        return false;
      case actions.DEVICE_LOCK_LIST_REQUEST:
        return true;
      case actions.USER_ITEM_SUCCESS:
        return false;
      case actions.USER_ITEM_FAILURE:
        return false;
      case actions.USER_ITEM_REQUEST:
        return true;
      case actions.LOCK_ACTION_SUCCESS:
        return false;
      case actions.LOCK_ACTION_FAILURE:
        return false;
      case actions.LOCK_ACTION_REQUEST:
        return true;
      default:
        return state;
    }
  },

  userItemsList(state: IInventory[] = [], action): IInventory[] {
    switch (action.type) {
      case actions.USER_ITEMS_LIST_SUCCESS:
        return action.data;
      case actions.USER_ITEMS_LIST_FAILURE:
        return action.state;
      default:
        return state;
    }
  },
  deviceLockList(state: IInventory[] = [], action): IInventory[] {
    switch (action.type) {
      case actions.DEVICE_LOCK_LIST_SUCCESS:
        return action.data;
      case actions.DEVICE_LOCK_LIST_FAILURE:
        return action.state;
      case actions.CLEAR_DEVICE_LOCK_LIST:
        return [];
      default:
        return state;
    }
  },
  userItem(state = {}, action) {
    switch (action.type) {
      case actions.USER_ITEM_SUCCESS:
        return action.data;
      case actions.LOCK_ACTION_SUCCESS:
        console.log("action", action.data.Attributes);
        return action.data.Attributes;
      default:
        return state;
    }
  },
  lockActionSuccess(state = "", action) {
    switch (action.type) {
      case actions.LOCK_ACTION_SUCCESS:
        return "OK";
      case actions.LOCK_ACTION_FAILURE:
        return "ERROR";
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
