import { IRootState } from "src/redux/reducer";
import { prefix } from "./actions";

export const loadingSelector = (state: IRootState) => state[prefix].loading;
export const quotesListSelector = (state: IRootState) =>
  state[prefix].quotesList;
export const quotesFilterListSelector = (state: IRootState) =>
  state[prefix].quotesFilterList;
export const quoteSelector = (state: IRootState) => state[prefix].quote;
export const totalSelector = (state: IRootState) => state[prefix].total;
export const pageSelector = (state: IRootState) => state[prefix].page;
export const pageSizeSelector = (state: IRootState) => state[prefix].pageSize;

export const submitSuccessSelector = (state: IRootState) =>
  state[prefix].submitSuccess;
export const frEnrollSuccessSelector = (state: IRootState) =>
  state[prefix].frEnrollSuccess;
export const orderSelector = (state: IRootState) => state[prefix].order;
export const onFilterChangeSelector = (state: IRootState) =>
  state[prefix].onFilterChange;
export const onQuoteSearchFilterChangeSelector = (state: IRootState) =>
  state[prefix].onQuoteSearchFilterChange;
