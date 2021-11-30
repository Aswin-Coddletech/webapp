import { createStructuredSelector } from "reselect";

import {
  inventoryListSelector,
  itemSelector,
  loadingSelector,
  pageSelector,
  pageSizeSelector,
  totalSelector
} from "src/redux/di-list/selectors";

import { IRootState } from "src/redux/reducer";

import { IDiListData } from "./DiList";

export default createStructuredSelector<IRootState, IDiListData>({
  list: inventoryListSelector,
  item: itemSelector,
  loading: loadingSelector,
  total: totalSelector,
  page: pageSelector,
  pageSize: pageSizeSelector
});
