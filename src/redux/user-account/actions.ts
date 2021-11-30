import { IUserAccount } from "src/interfaces/UserAccount.interface";

export const prefix = "userAccount";

export const USER_REQUEST = `${prefix}/USER_REQUEST`;
export const USER_SUCCESS = `${prefix}/USER_SUCCESS`;
export const USER_FAILURE = `${prefix}/USER_FAILURE`;

export const getUser = () => ({
  promise: (api: any) => api.useraccounts.get(),
  types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE]
});

export const FLAG_REQUEST = `${prefix}/FLAG_REQUEST`;
export const FLAG_SUCCESS = `${prefix}/FLAG_SUCCESS`;
export const FLAG_FAILURE = `${prefix}/FLAG_FAILURE`;

export const getPolicyChangedFlag = (user: IUserAccount) => ({
  promise: (api: any) => api.useraccounts.policyFlag(user),
  types: [FLAG_REQUEST, FLAG_SUCCESS, FLAG_FAILURE]
});

export const POLICY_REQUEST = `${prefix}/POLICY_REQUEST`;
export const POLICY_SUCCESS = `${prefix}/POLICY_SUCCESS`;
export const POLICY_FAILURE = `${prefix}/POLICY_FAILURE`;

export const acceptPolicy = () => ({
  promise: (api: any) => api.useraccounts.policyAcceptedUpdate({}),
  types: [POLICY_REQUEST, POLICY_SUCCESS, POLICY_FAILURE]
});

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const USER_ACCOUNT_REQUEST = `${prefix}/USER_ACCOUNT_REQUEST`;
export const USER_ACCOUNT_SUCCESS = `${prefix}/USER_ACCOUNT_SUCCESS`;
export const USER_ACCOUNT_FAILURE = `${prefix}/USER_ACCOUNT_FAILURE`;

export const userAccountDetail = (userId: any) => ({
  promise: (api: any) => api.useraccounts.userAccountDetail(userId),
  types: [USER_ACCOUNT_REQUEST, USER_ACCOUNT_SUCCESS, USER_ACCOUNT_FAILURE]
});

export const INSPECTED_USER_ACCOUNT_REQUEST = `${prefix}/INSPECTED_USER_ACCOUNT_REQUEST`;
export const INSPECTED_USER_ACCOUNT_SUCCESS = `${prefix}/INSPECTED_USER_ACCOUNT_SUCCESS`;
export const INSPECTED_USER_ACCOUNT_FAILURE = `${prefix}/INSPECTED_USER_ACCOUNT_FAILURE`;

export const resetKyc = (userId: any) => ({
  promise: (api: any) => api.useraccounts.resetKyc(userId),
  types: [RESET_KYC_REQUEST, RESET_KYC_SUCCESS, RESET_KYC_FAILURE]
});

export const RESET_KYC_REQUEST = `${prefix}/RESET_KYC_REQUEST`;
export const RESET_KYC_SUCCESS = `${prefix}/RESET_KYC_SUCCESS`;
export const RESET_KYC_FAILURE = `${prefix}/RESET_KYC_FAILURE`;

export const verifyKyc = (userId: any) => ({
  promise: (api: any) => api.useraccounts.verifyKyc(userId),
  types: [VERIFY_KYC_REQUEST, VERIFY_KYC_SUCCESS, VERIFY_KYC_FAILURE]
});

export const VERIFY_KYC_REQUEST = `${prefix}/VERIFY_KYC_REQUEST`;
export const VERIFY_KYC_SUCCESS = `${prefix}/VERIFY_KYC_SUCCESS`;
export const VERIFY_KYC_FAILURE = `${prefix}/VERIFY_KYC_FAILURE`;

export const inspectedUserAccountDetail = (userId: any) => ({
  promise: (api: any) => api.useraccounts.adminAccountDetail(userId),
  types: [
    INSPECTED_USER_ACCOUNT_REQUEST,
    INSPECTED_USER_ACCOUNT_SUCCESS,
    INSPECTED_USER_ACCOUNT_FAILURE
  ]
});

export const APPROVED_USER_ACCOUNT_REQUEST = `${prefix}/APPROVED_USER_ACCOUNT_REQUEST`;
export const APPROVED_USER_ACCOUNT_SUCCESS = `${prefix}/APPROVED_USER_ACCOUNT_SUCCESS`;
export const APPROVED_USER_ACCOUNT_FAILURE = `${prefix}/APPROVED_USER_ACCOUNT_FAILURE`;

export const approvedUserAccountDetail = (userId: any) => ({
  promise: (api: any) => api.useraccounts.adminAccountDetail(userId),
  types: [
    APPROVED_USER_ACCOUNT_REQUEST,
    APPROVED_USER_ACCOUNT_SUCCESS,
    APPROVED_USER_ACCOUNT_FAILURE
  ]
});

export const DISBURSAL_CREATED_USER_ACCOUNT_REQUEST = `${prefix}/DISBURSAL_CREATED_USER_ACCOUNT_REQUEST`;
export const DISBURSAL_CREATED_USER_ACCOUNT_SUCCESS = `${prefix}/DISBURSAL_CREATED_USER_ACCOUNT_SUCCESS`;
export const DISBURSAL_CREATED_USER_ACCOUNT_FAILURE = `${prefix}/DISBURSAL_CREATED_USER_ACCOUNT_FAILURE`;

export const DisbursalCreatedByDetail = (userId: any) => ({
  promise: (api: any) => api.useraccounts.adminAccountDetail(userId),
  types: [
    DISBURSAL_CREATED_USER_ACCOUNT_REQUEST,
    DISBURSAL_CREATED_USER_ACCOUNT_SUCCESS,
    DISBURSAL_CREATED_USER_ACCOUNT_FAILURE
  ]
});

export const USER_LIST_REQUEST = `${prefix}/USER_LIST_REQUEST`;
export const USER_LIST_SUCCESS = `${prefix}/USER_LIST_SUCCESS`;
export const USER_LIST_FAILURE = `${prefix}/USER_FAILURE`;

export const getUserList = (filter: string, search: string) => ({
  promise: (api: any) => api.useraccounts.userList(filter, search),
  types: [USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAILURE]
});

export const CLEAR_USERS_LIST = `${prefix}/CLEAR_USERS_LIST`;

export const clearUserList = () => ({
  type: CLEAR_USERS_LIST
});
export const CLEAR_RESET_KYC = `${prefix}/CLEAR_RESET_KYC`;

export const clearResetKyc = () => ({
  type: CLEAR_RESET_KYC
});
export const CLEAR_VERIFY_KYC = `${prefix}/CLEAR_VERIFY_KYC`;

export const clearVerifyKyc = () => ({
  type: CLEAR_VERIFY_KYC
});
