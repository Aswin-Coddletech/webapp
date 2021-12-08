import { createSelector } from "reselect";
import { createStructuredSelector } from "reselect";

import { prefix } from "./actions";

import { IRootState } from "src/redux/reducer";

export const loadingSelector = (state: IRootState) => state[prefix].loading;
export const totalSelector = (state: IRootState) => state[prefix].total;
export const pageSelector = (state: IRootState) => state[prefix].page;
export const pageSizeSelector = (state: IRootState) => state[prefix].pageSize;
export const inventoryListSelector = (state: IRootState) => state[prefix].list;
export const itemSelector = (state: IRootState) => state[prefix].item;

export const filtersSelector = createStructuredSelector<any, any>({
  offset: createSelector(
    pageSelector,
    pageSizeSelector,
    (page, pageSize) => pageSize * (page - 1)
  ),
  limit: pageSizeSelector
});

export const inventorySummarySelector = (state: IRootState) =>
  state[prefix].summary;
