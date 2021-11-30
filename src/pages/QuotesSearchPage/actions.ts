import { getQuotesFilterList } from "src/redux/quotes/actions";
//import { getUserList } from "src/redux/user-account/actions";
import { userAccountDetail } from "src/redux/user-account/actions";
import {
  onSearchFilterChange,
  onPagenatationChange
} from "src/redux/utils/actions";
export default {
  getUser: userAccountDetail,
  getQuotesFilterList,
  onInit: getQuotesFilterList,
  onSearchFilterChange,
  onPagenatationChange
};
