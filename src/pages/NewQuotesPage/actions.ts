import { getQuotesFilterList } from "src/redux/quotes/actions";
import { userAccountDetail } from "src/redux/user-account/actions";
import { onFilterChange, onPagenatationChange } from "src/redux/utils/actions";
export default {
  getUser: userAccountDetail,
  getQuotesFilterList,
  onInit: getQuotesFilterList,
  onFilterChange,
  onPagenatationChange
};
