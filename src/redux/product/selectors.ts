import { prefix } from "./actions";
import { IRootState } from "../reducer";

export const loadingSelector = (state: IRootState) => state[prefix].loading;

export const productListSelector = (state: IRootState) =>
  state[prefix].productList;

export const productSelector = (state: IRootState) => state[prefix].product;
