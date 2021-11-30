import { combineReducers } from "redux";

import * as actions from "./actions";

import { IInventorySummary } from "src/interfaces/Inventory.interface";
import { IInventory } from "src/interfaces/Inventory.interface";

export interface IInventoryListState {
  loading: boolean;
  list: IInventory[];
  item: IInventory;
  total: number;
  page: number;
  pageSize: number;
  selectedItemFilter: string;
  summary: IInventorySummary;
}

const reducer = combineReducers<IInventoryListState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.LIST_SUCCESS:
      case actions.LIST_FAILURE:
        return false;
      case actions.LIST_REQUEST:
        return true;
      case actions.ITEM_SUCCESS:
        return false;
      case actions.ITEM_FAILURE:
        return false;
      case actions.ITEM_REQUEST:
        return true;
      default:
        return state;
    }
  },
  list(state: IInventory[] = [], action): IInventory[] {
    switch (action.type) {
      case actions.INIT:
        return action.data || null;
      case actions.LIST_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },

  total(state = 0, action) {
    switch (action.type) {
      case actions.LIST_SUCCESS:
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
  selectedItemFilter(state = "all", action) {
    switch (action.type) {
      case actions.CHANGE_INVENTORY_FILTER:
        return action.payload;
      default:
        return state;
    }
  },
  summary(
    state = {
      countOfInventoryItems: {},
      itemCountByInsuranceStatus: {},
      totalPurchasePrice: {},
      itemAmountByInsuranceStatus: {}
    },
    action
  ) {
    switch (action.type) {
      case actions.SUMMARY_SUCCESS:
        let tempSummary = {};
        tempSummary["countOfInventoryItems"] = action.data.length;
        tempSummary["itemCountByInsuranceStatus"] = action.data.length;
        tempSummary["totalPurchasePrice"] = action.data.length * 100;
        tempSummary["itemAmountByInsuranceStatus"] = action.data.length * 50;
        //return action.data || {};
        return tempSummary || {};
      default:
        return state;
    }
  },

  item(state = {}, action) {
    switch (action.type) {
      case actions.CHANGE_ITEM:
        return action.payload;
      case actions.ITEM_SUCCESS:
        return action.data;
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
