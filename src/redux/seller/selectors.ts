import { prefix } from "./actions";
import { IRootState } from "../reducer";

export const loadingSelector = (state: IRootState) => state[prefix].loading;

export const sellerListSelector = (state: IRootState) =>
  state[prefix].sellerList;

export const sellerSelector = (state: IRootState) => state[prefix].seller;
