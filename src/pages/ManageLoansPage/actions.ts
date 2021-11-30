import { getLoansList } from "src/redux/loans/actions";
import {
  onSearchFilterChange,
  onPagenatationChange
} from "src/redux/utils/actions";
//import { onQuoteSearchFilterChange } from "src/redux/quotes/actions";
import { userAccountDetail } from "src/redux/user-account/actions";
export default {
  getLoansList,
  onInit: getLoansList,
  onRefresh: getLoansList,
  getUser: userAccountDetail,
  onSearchFilterChange,
  onPagenatationChange
};
