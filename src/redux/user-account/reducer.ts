import { combineReducers } from "redux";

import * as actions from "./actions";

import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface IUserAccountState {
  loading: boolean;
  userInfo: IUserAccount;
  isPolicyChanged: boolean;
  userAccount: IUserAccount;
  userList: IUserAccount[];
  disbursedUser: any;
  inspectedUser: any;
  approvedUser: any;
  resetKyc: any;
  verifyKyc: any;
  kycSubmitSucess: string;
}

const reducer = combineReducers<IUserAccountState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.USER_SUCCESS:
      case actions.USER_FAILURE:
        return false;
      case actions.USER_REQUEST:
        return true;
      case actions.USER_LIST_SUCCESS:
      case actions.USER_LIST_FAILURE:
        return false;
      case actions.USER_LIST_REQUEST:
        return true;
      case actions.USER_ACCOUNT_SUCCESS:
      case actions.USER_ACCOUNT_FAILURE:
        return false;
      case actions.USER_ACCOUNT_REQUEST:
        return true;
      case actions.RESET_KYC_SUCCESS:
      case actions.RESET_KYC_FAILURE:
        return false;
      case actions.RESET_KYC_REQUEST:
        return true;
      case actions.VERIFY_KYC_SUCCESS:
      case actions.VERIFY_KYC_FAILURE:
        return false;
      case actions.VERIFY_KYC_REQUEST:
        return true;
      default:
        return state;
    }
  },
  userInfo(state: IUserAccount = {}, action): IUserAccount {
    switch (action.type) {
      case actions.USER_SUCCESS:
        return action.data;
      case actions.USER_FAILURE:
        return {};
      default:
        return state;
    }
  },

  isPolicyChanged(state = false, action) {
    switch (action.type) {
      case actions.FLAG_SUCCESS:
        return action.data;
      case actions.USER_FAILURE:
        return state;
      case actions.POLICY_SUCCESS:
        return false;
      case actions.POLICY_FAILURE:
        return true;
      default:
        return state;
    }
  },
  userAccount(state = {}, action) {
    switch (action.type) {
      case actions.USER_ACCOUNT_SUCCESS:
      case actions.DISBURSAL_CREATED_USER_ACCOUNT_SUCCESS:
        return action.data;
      case actions.USER_ACCOUNT_REQUEST:
      case actions.USER_ACCOUNT_FAILURE:
      case actions.DISBURSAL_CREATED_USER_ACCOUNT_FAILURE:
        return {};
      default:
        return state;
    }
  },
  userList(state: IUserAccount[] = [], action): IUserAccount[] {
    switch (action.type) {
      case actions.USER_LIST_SUCCESS:
        return action.data;
      case actions.USER_LIST_FAILURE:
        return [];
      case actions.CLEAR_USERS_LIST:
        return [];
      default:
        return state;
    }
  },
  disbursedUser(state = {}, action) {
    switch (action.type) {
      case actions.DISBURSAL_CREATED_USER_ACCOUNT_SUCCESS:
      case actions.INSPECTED_USER_ACCOUNT_SUCCESS:
      case actions.APPROVED_USER_ACCOUNT_SUCCESS:
        return action.data;
      case actions.DISBURSAL_CREATED_USER_ACCOUNT_FAILURE:
      case actions.INSPECTED_USER_ACCOUNT_FAILURE:
      case actions.APPROVED_USER_ACCOUNT_FAILURE:
        return [];
      default:
        return state;
    }
  },
  inspectedUser(state = {}, action) {
    switch (action.type) {
      case actions.INSPECTED_USER_ACCOUNT_SUCCESS:
        return action.data;
      case actions.INSPECTED_USER_ACCOUNT_FAILURE:
        return [];
      default:
        return state;
    }
  },
  approvedUser(state = {}, action) {
    switch (action.type) {
      case actions.APPROVED_USER_ACCOUNT_SUCCESS:
        return action.data;
      case actions.APPROVED_USER_ACCOUNT_FAILURE:
        return [];
      default:
        return state;
    }
  },
  resetKyc(state = {}, action) {
    switch (action.type) {
      case actions.RESET_KYC_SUCCESS:
        return action.data;
      case actions.RESET_KYC_FAILURE:
        return [];
      default:
        return state;
    }
  },
  verifyKyc(state = {}, action) {
    switch (action.type) {
      case actions.VERIFY_KYC_SUCCESS:
        return action.data;
      case actions.VERIFY_KYC_FAILURE:
        return [];
      default:
        return state;
    }
  },
  kycSubmitSucess(state = "", action) {
    switch (action.type) {
      case actions.RESET_KYC_SUCCESS:
        return "YES";
      case actions.RESET_KYC_FAILURE:
        return "NO";
      case actions.VERIFY_KYC_SUCCESS:
        return "YES";
      case actions.VERIFY_KYC_FAILURE:
        return "NO";
      case actions.CLEAR_VERIFY_KYC:
      case actions.CLEAR_RESET_KYC:
        return "";
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
