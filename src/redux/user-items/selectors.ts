import { IRootState } from "src/redux/reducer";
import { prefix } from "./actions";

export const loadingSelector = (state: IRootState) => state[prefix].loading;
export const userItemsListSelector = (state: IRootState) =>
  state[prefix].userItemsList;
export const deviceLockListSelector = (state: IRootState) =>
  state[prefix].deviceLockList;
export const userItemSelector = (state: IRootState) => state[prefix].userItem;
export const lockActionSuccessSelector = (state: IRootState) =>
  state[prefix].lockActionSuccess;
