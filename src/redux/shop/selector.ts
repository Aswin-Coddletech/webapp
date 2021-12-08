import { prefix } from "./actions";
import { IRootState } from "../reducer";

export const loadingSelector = (state: IRootState) => state[prefix].loading;

export const shopListSelector = (state: IRootState) => state[prefix].shopList;

export const shopSelector = (state: IRootState) => state[prefix].shop;
