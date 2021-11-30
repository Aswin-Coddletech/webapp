import { combineReducers } from "redux";

import * as actions from "./actions";

import { IPolicy } from "src/interfaces/Insurance.interface";
import { IInventory } from "src/interfaces/Inventory.interface";
import { IOrder } from "src/interfaces/Payment.interface";

export interface IInsurancePolicyState {
  policiesList: IPolicy[];
  itemsNotInPolicy: IInventory[];
  policy: IPolicy;
  insertWarrantedItemsSuccess: boolean;
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  submitSuccess: string;
  order: IOrder;
}

const reducer = combineReducers<IInsurancePolicyState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.SUBMIT_POLICY_SUCCESS:
        //success means not loading
        return false;
      case actions.SUBMIT_POLICY_FAILURE:
        //failure means not loading
        return false;
      case actions.SUBMIT_POLICY_REQUEST:
        //request means loading is true as some backend call is happenning
        return true;
      case actions.POLICIES_LIST_SUCCESS:
        return false;
      case actions.POLICIES_LIST_FAILURE:
        return false;
      case actions.POLICIES_LIST_REQUEST:
        return true;
      case actions.POLICY_SUCCESS:
        return false;
      case actions.POLICY_FAILURE:
        return false;
      case actions.POLICY_REQUEST:
        return true;
      case actions.ITEMS_NOT_IN_POLICY_SUCCESS:
        return false;
      case actions.ITEMS_NOT_IN_POLICY_FAILURE:
        return false;
      case actions.ITEMS_NOT_IN_POLICY_REQUEST:
        return true;
      default:
        return state;
    }
  },

  policiesList(state: IPolicy[] = [], action): IPolicy[] {
    switch (action.type) {
      case actions.POLICIES_LIST_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },
  total(state = 0, action) {
    switch (action.type) {
      case actions.POLICIES_LIST_SUCCESS:
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
  itemsNotInPolicy(state: IInventory[] = [], action): IInventory[] {
    switch (action.type) {
      case actions.ITEMS_NOT_IN_POLICY_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },
  policy(state = {}, action) {
    switch (action.type) {
      case actions.CHANGE_POLICY:
        return action.payload;
      case actions.POLICY_SUCCESS:
        return action.data;
      case actions.SUBMIT_POLICY_SUCCESS:
        return action.data.policy;
      case action.RESET_POLICY:
        return {};
      default:
        return state;
    }
  },
  insertWarrantedItemsSuccess(state = false, action) {
    switch (action.type) {
      case actions.INSERT_WARRANTEDITEMS_TO_POLICY_SUCCESS:
        return true;
      case actions.INSERT_WARRANTEDITEMS_TO_POLICY_FAILURE:
        return false;
      case actions.INSERT_WARRANTEDITEMS_TO_POLICY_REQUEST:
        return false;
      default:
        return state;
    }
  },
  submitSuccess(state = "", action) {
    switch (action.type) {
      case actions.SUBMIT_POLICY_SUCCESS:
        return "YES";
      case actions.SUBMIT_POLICY_FAILURE:
        return "NO";
      case actions.SUBMIT_POLICY_REQUEST:
        return "REQUESTED";
      case actions.RESET_SUBMIT_SUCCESS:
        return "";
      default:
        return state;
    }
  },
  order(state = {}, action) {
    switch (action.type) {
      case actions.SUBMIT_POLICY_SUCCESS:
        return action.data.order;
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
