import { IInventory } from "src/interfaces/Inventory.interface";

export const prefix = "diList";

export const LIST_REQUEST = `${prefix}/LIST_REQUEST`;
export const LIST_SUCCESS = `${prefix}/LIST_SUCCESS`;
export const LIST_FAILURE = `${prefix}/LIST_FAILURE`;

/*
export const list = () => (dataProvider: any) => ({
  promise: (api: any) => api.inventory.list(dataProvider(filtersSelector)),
  types: [LIST_REQUEST, LIST_SUCCESS, LIST_FAILURE],
});
*/

export const getList = () => ({
  promise: (api: any) => api.inventory.list(),
  types: [LIST_REQUEST, LIST_SUCCESS, LIST_FAILURE]
});

export const SUMMARY_REQUEST = `${prefix}/SUMMARY_REQUEST`;
export const SUMMARY_SUCCESS = `${prefix}/SUMMARY_SUCCESS`;
export const SUMMARY_FAILURE = `${prefix}/SUMMARY_FAILURE`;

/* NOTE: TODO: Uncomment this when you are ready with REAL API for summary
export const getSummary = () => (dataProvider: any) => ({
  promise: (api: any) => api.inventory.summary(dataProvider(filtersSelector)),
  types: [SUMMARY_REQUEST, SUMMARY_SUCCESS, SUMMARY_FAILURE],
});
*/
export const getSummary = () => (dataProvider: any) => ({
  promise: (api: any) => api.inventory.list(),
  types: [SUMMARY_REQUEST, SUMMARY_SUCCESS, SUMMARY_FAILURE]
});

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const CHANGE_PAGE = `${prefix}/CHANGE_PAGE`;
export const changePagination = (page: any) => ({
  type: CHANGE_PAGE,
  page
});

export const CHANGE_PAGE_SIZE = `${prefix}/CHANGE_PAGE_SIZE`;
export const changePageSize = (_: any, pageSize: any) => ({
  type: CHANGE_PAGE_SIZE,
  pageSize
});

export const CHANGE_INVENTORY_FILTER = `${prefix}/CHANGE_INVENTORY_FILTER`;
export const changeInventoryFilter = (itemId: string) => ({
  type: CHANGE_INVENTORY_FILTER,
  payload: itemId
});

export const CHANGE_ITEM = `${prefix}/CHANGE_ITEM`;
export const changeItem = (item: IInventory) => ({
  type: CHANGE_ITEM,
  payload: item
});

export const ITEM_REQUEST = `${prefix}/ITEM_REQUEST`;
export const ITEM_SUCCESS = `${prefix}/ITEM_SUCCESS`;
export const ITEM_FAILURE = `${prefix}/ITEM_FAILURE`;

export const getItem = (itemId: string) => ({
  promise: (api: any) => api.inventory.getitem(itemId),
  types: [ITEM_REQUEST, ITEM_SUCCESS, ITEM_FAILURE]
});
