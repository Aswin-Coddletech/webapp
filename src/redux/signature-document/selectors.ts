import { IRootState } from "src/redux/reducer";
import { prefix } from "./actions";

export const loadingSelector = (state: IRootState) => state[prefix].loading;
export const quotesListSelector = (state: IRootState) =>
  state[prefix].quotesList;
export const quoteSelector = (state: IRootState) => state[prefix].quote;
export const submitSuccessSelector = (state: IRootState) =>
  state[prefix].submitSuccess;
