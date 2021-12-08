import { prefix } from "./actions";

import { IRootState } from "src/redux/reducer";

export const loadingSelector = (state: IRootState) => state[prefix].loading;
export const userInfoSelector = (state: IRootState) => state[prefix].userInfo;
export const isPolicyChangedSelector = (state: IRootState) =>
  state[prefix].isPolicyChanged;

export const userAccountSelector = (state: IRootState) =>
  state[prefix].userAccount;
export const userAccountLoadingSelector = (state: IRootState) =>
  state[prefix].loading;
export const InspectedUserAccountSelector = (state: IRootState) =>
  state[prefix].userAccount;
export const approvedUserAccountSelector = (state: IRootState) =>
  state[prefix].userAccount;
export const disbursalCreatedUserAccountSelector = (state: IRootState) =>
  state[prefix].userAccount;
export const userListSelector = (state: IRootState) => state[prefix].userList;
export const disbursedUserSelector = (state: IRootState) =>
  state[prefix].disbursedUser;
export const inspectedUserSelector = (state: IRootState) =>
  state[prefix].inspectedUser;
export const approvedUserSelector = (state: IRootState) =>
  state[prefix].approvedUser;
export const kycSubmitSuccessSelector = (state: IRootState) =>
  state[prefix].kycSubmitSucess;
