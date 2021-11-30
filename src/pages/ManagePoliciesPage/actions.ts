import {
  changePageSize,
  changePagination,
  changePolicy,
  getPoliciesList
} from "src/redux/insurance-policy/actions";

export default {
  changePageSize,
  changePagination,
  changeSelectedPolicy: changePolicy,
  onInit: getPoliciesList,
  onRefresh: getPoliciesList
};
