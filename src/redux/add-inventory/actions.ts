import { ITag } from "src/interfaces/Inventory.interface";
import { submitInventoryRequestSelector } from "src/redux/add-inventory/selectors";

export const prefix = "addInventory";

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const INIT_FIELDS_FOR_NEWITEM = `${prefix}/INIT_FIELDS_FOR_NEWITEM`;
export const initFieldsForNewItem = () => ({
  type: INIT_FIELDS_FOR_NEWITEM
});

export const SET_DETECTED_SPECS = `${prefix}/SET_DETECTED_SPECS`;
export const setDetectedSpecs = () => ({
  type: SET_DETECTED_SPECS
});

export const SET_CATEGORY = `${prefix}/SET_CATEGORY`;
export const setCategory = (category: string) => ({
  type: SET_CATEGORY,
  payload: category
});

export const SET_SUBCATEGORY = `${prefix}/SET_SUBCATEGORY`;
export const setSubcategory = (subcategory: string) => ({
  type: SET_SUBCATEGORY,
  payload: subcategory
});

export const SET_OEM = `${prefix}/SET_OEM`;
export const setOem = (oem: string) => ({
  type: SET_OEM,
  payload: oem
});

export const SET_OEM_PRODUCT_MODEL = `${prefix}/SET_OEM_PRODUCT_MODEL`;
export const setOemProductModel = (model: string) => ({
  type: SET_OEM_PRODUCT_MODEL,
  payload: model
});

export const SET_OEM_SERIAL_NUMBER = `${prefix}/SET_OEM_SERIAL_NUMBER`;
export const setOemSerialNumber = (serialnumber: string) => ({
  type: SET_OEM_SERIAL_NUMBER,
  payload: serialnumber
});

export const SET_BUY_AMOUNT = `${prefix}/SET_BUY_AMOUNT`;
export const setBuyAmount = (amount: number) => ({
  type: SET_BUY_AMOUNT,
  payload: amount
});

export const SET_TAGS = `${prefix}/SET_TAGS`;
export const setTags = (tags: ITag[]) => ({
  type: SET_TAGS,
  payload: tags
});

export const SET_FILELIST = `${prefix}/SET_FILELIST`;
export const setFileList = (fileList: []) => ({
  type: SET_FILELIST,
  payload: fileList
});

export const SET_BASE64_IMAGE_URL = `${prefix}/SET_BASE64_IMAGE_URL`;
export const setBase64imageUrl = (setBase64imageUrl: string) => ({
  type: SET_BASE64_IMAGE_URL,
  payload: setBase64imageUrl
});

export const SET_SELECTED_LABELS = `${prefix}/SET_SELECTED_LABELS`;
export const setSelectedLabels = (selectedLabels: []) => ({
  type: SET_SELECTED_LABELS,
  payload: selectedLabels
});

/*
export const list = () => (dataProvider: any) => ({
  promise: (api: any) => api.inventory.list(dataProvider(filtersSelector)),
  types: [LABELS_REQUEST, LABELS_SUCCESS, LABELS_FAILURE],
});
*/
export const LABELS_REQUEST = `${prefix}/LABELS_REQUEST`;
export const LABELS_SUCCESS = `${prefix}/LABELS_SUCCESS`;
export const LABELS_FAILURE = `${prefix}/LABELS_FAILURE`;

export const getDetectedLabels = (base64imageUrl: string) => ({
  promise: (api: any) => api.inventory.detectimage(base64imageUrl),
  types: [LABELS_REQUEST, LABELS_SUCCESS, LABELS_FAILURE]
});

export const SET_FILELIST_AND_DETECT_LABELS = `${prefix}/SET_FILELIST_AND_DETECT_LABELS`;
export const setFileListAndDetectLabels = (fileList: []) => ({
  type: SET_FILELIST_AND_DETECT_LABELS,
  payload: fileList
});

// submitInventoryItem
export const SUBMIT_ITEM_REQUEST = `${prefix}/SUBMIT_ITEM_REQUEST`;
export const SUBMIT_ITEM_SUCCESS = `${prefix}/SUBMIT_ITEM_SUCCESS`;
export const SUBMIT_ITEM_FAILURE = `${prefix}/SUBMIT_ITEM_FAILURE`;

export const submitInventoryItem = () => (dataProvider: any) => ({
  promise: (api: any) =>
    api.inventory.additem(dataProvider(submitInventoryRequestSelector)),
  types: [SUBMIT_ITEM_REQUEST, SUBMIT_ITEM_SUCCESS, SUBMIT_ITEM_FAILURE]
});
