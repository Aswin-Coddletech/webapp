//import { IInventory } from "src/interfaces/Inventory.interface";

export const prefix = "userItems";

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const USER_ITEMS_LIST_REQUEST = `${prefix}/USER_ITEMS_LIST_REQUEST`;
export const USER_ITEMS_LIST_SUCCESS = `${prefix}/USER_ITEMS_LIST_SUCCESS`;
export const USER_ITEMS_LIST_FAILURE = `${prefix}/USER_ITEMS_LIST_FAILURE`;

export const getUserItemsList = (status: any) => ({
  promise: (api: any) => api.useritems.userItemsList(status),
  types: [
    USER_ITEMS_LIST_REQUEST,
    USER_ITEMS_LIST_SUCCESS,
    USER_ITEMS_LIST_FAILURE
  ]
});

export const DEVICE_LOCK_LIST_REQUEST = `${prefix}/DEVICE_LOCK_LIST_REQUEST`;
export const DEVICE_LOCK_LIST_SUCCESS = `${prefix}/DEVICE_LOCK_LIST_SUCCESS`;
export const DEVICE_LOCK_LIST_FAILURE = `${prefix}/DEVICE_LOCK_LIST_FAILURE`;

export const getdeviceLockList = (status: any, search: any) => ({
  promise: (api: any) => api.useritems.deviceLockList(status, search),
  types: [
    DEVICE_LOCK_LIST_REQUEST,
    DEVICE_LOCK_LIST_SUCCESS,
    DEVICE_LOCK_LIST_FAILURE
  ]
});

export const CLEAR_DEVICE_LOCK_LIST = `${prefix}/CLEAR_DEVICE_LOCK_LIST`;
export const clearDeviceLockList = () => ({
  type: CLEAR_DEVICE_LOCK_LIST
});

export const USER_ITEM_REQUEST = `${prefix}/USER_ITEM_REQUEST`;
export const USER_ITEM_SUCCESS = `${prefix}/USER_ITEM_SUCCESS`;
export const USER_ITEM_FAILURE = `${prefix}/USER_ITEM_FAILURE`;

export const getUserItem = (itemId: any) => ({
  promise: (api: any) => api.useritems.userItem(itemId),
  types: [USER_ITEM_REQUEST, USER_ITEM_SUCCESS, USER_ITEM_FAILURE]
});

export const LOCK_ACTION_REQUEST = `${prefix}/LOCK_ACTION_REQUEST`;
export const LOCK_ACTION_SUCCESS = `${prefix}/LOCK_ACTION_SUCCESS`;
export const LOCK_ACTION_FAILURE = `${prefix}/LOCK_ACTION_FAILURE`;

export const applyLockAction = (itemId: any, lockAction: any) => ({
  promise: (api: any) => api.useritems.applyLockAction(itemId, lockAction),
  types: [LOCK_ACTION_REQUEST, LOCK_ACTION_SUCCESS, LOCK_ACTION_FAILURE]
});
