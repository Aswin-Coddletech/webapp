import {
  setDetectedSpecs,
  submitInventoryItem,
  initFieldsForNewItem
} from "src/redux/add-inventory/actions";

export default {
  initDefaultSpecs: setDetectedSpecs,
  onSubmit: submitInventoryItem,
  onInit: initFieldsForNewItem
};
