import {
  changePageSize,
  changePagination,
  getItemsNotInPolicy,
  getPolicy
  //insertWarrantedItems,
} from "src/redux/insurance-policy/actions";

export default {
  changePageSize,
  changePagination,
  getItemsNotInPolicy,
  refreshPolicy: getPolicy
  //addWarrantedItems: insertWarrantedItems,
};
