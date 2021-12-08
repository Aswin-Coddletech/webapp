import { IRootState } from "src/redux/reducer";
import { prefix } from "./actions";

export const loadingSelector = (state: IRootState) => state[prefix].loading;
export const policiesListSelector = (state: IRootState) =>
  state[prefix].policiesList;
export const policySelector = (state: IRootState) => state[prefix].policy;
export const totalSelector = (state: IRootState) => state[prefix].total;
export const pageSelector = (state: IRootState) => state[prefix].page;
export const pageSizeSelector = (state: IRootState) => state[prefix].pageSize;
export const itemsNotInPolicySelector = (state: IRootState) =>
  state[prefix].itemsNotInPolicy;

export const submitSuccessSelector = (state: IRootState) =>
  state[prefix].submitSuccess;
export const orderSelector = (state: IRootState) => state[prefix].order;
