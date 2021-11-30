import { combineReducers } from "redux";

import * as actions from "./actions";

import { ITag } from "src/interfaces/Inventory.interface";

export interface IAddInventoryState {
  fileList: [];
  detectedLabels: [];
  selectedLabels: [];
  descriptionLabels: ITag[];
  base64imageUrl: string;
  category: string;
  subcategory: string;
  oem: string;
  oemProductModel: string;
  oemSerialNumber: string;
  buyAmount: number;
  loading: boolean;
  submitSuccess: string;
}

const reducer = combineReducers<IAddInventoryState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.LABELS_SUCCESS:
      case actions.LABELS_FAILURE:
        return false;
      case actions.LABELS_REQUEST:
        return true;
      case actions.SUBMIT_ITEM_SUCCESS:
      case actions.SUBMIT_ITEM_FAILURE:
        return false;
      case actions.SUBMIT_ITEM_REQUEST:
        return true;
      default:
        return state;
    }
  },
  submitSuccess(state = "", action) {
    switch (action.type) {
      case actions.SUBMIT_ITEM_SUCCESS:
        return "YES";
      case actions.SUBMIT_ITEM_FAILURE:
        return "NO";
      case actions.SUBMIT_ITEM_REQUEST:
        return "REQUESTED";
      default:
        return state;
    }
  },
  fileList(state: [] = [], action): [] {
    switch (action.type) {
      case actions.SET_FILELIST:
        //console.log("in reducer.ts fileList action=", action);
        state = action.payload;
        //console.log("in reducer.ts fileList state=", state);
        return action.payload;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return [];
      default:
        return state;
    }
  },
  base64imageUrl(state = "", action) {
    switch (action.type) {
      case actions.SET_BASE64_IMAGE_URL:
        state = action.payload;
        return action.payload;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return "";
      default:
        return state;
    }
  },
  selectedLabels(state: [] = [], action): [] {
    switch (action.type) {
      case actions.SET_SELECTED_LABELS:
        state = action.payload;
        return action.payload;
      case actions.LABELS_SUCCESS:
        return action.data;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return [];
      default:
        return state;
    }
  },
  detectedLabels(state: [] = [], action) {
    switch (action.type) {
      case actions.LABELS_SUCCESS:
        return action.data;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return [];
      default:
        return state;
    }
  },
  category(state = "", action) {
    switch (action.type) {
      case actions.SET_CATEGORY:
        return action.payload;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return "";
      default:
        return state;
    }
  },
  subcategory(state = "", action) {
    switch (action.type) {
      case actions.SET_SUBCATEGORY:
        return action.payload;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return "";
      default:
        return state;
    }
  },
  oem(state = "", action) {
    switch (action.type) {
      case actions.SET_OEM:
        return action.payload;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return "";
      default:
        return state;
    }
  },
  oemProductModel(state = "", action) {
    switch (action.type) {
      case actions.SET_OEM_PRODUCT_MODEL:
        return action.payload;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return "";
      default:
        return state;
    }
  },
  oemSerialNumber(state = "", action) {
    switch (action.type) {
      case actions.SET_OEM_SERIAL_NUMBER:
        return action.payload;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return "";
      default:
        return state;
    }
  },
  buyAmount(state = 0.01, action) {
    switch (action.type) {
      case actions.SET_BUY_AMOUNT:
        return action.payload;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return 0.01;
      default:
        return state;
    }
  },
  descriptionLabels(state: ITag[] = [], action) {
    switch (action.type) {
      case actions.SET_TAGS:
        return action.payload;
      case actions.INIT_FIELDS_FOR_NEWITEM:
        return [];
      default:
        return state;
    }
  }
});

export default { [actions.prefix]: reducer };
