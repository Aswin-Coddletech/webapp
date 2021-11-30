import { createStructuredSelector } from "reselect";

import {
  loadingSelector,
  totalSelector,
  pageSelector,
  pageSizeSelector,
  itemSelector
} from "src/redux/di-list/selectors";

import { IRootState } from "src/redux/reducer";

import { IItemCardData } from "./ItemCard";

export default createStructuredSelector<IRootState, IItemCardData>({
  loading: loadingSelector,
  total: totalSelector,
  page: pageSelector,
  pageSize: pageSizeSelector,
  item: itemSelector
});
