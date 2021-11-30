import { getQuotesList, approveQuote } from "src/redux/quotes/actions";
import { onFilterChange, onPagenatationChange } from "src/redux/utils/actions";
import { userAccountDetail } from "src/redux/user-account/actions";

export default {
  getUser: userAccountDetail,
  approveQuote,
  getQuotesList,
  onInit: getQuotesList,
  onRefresh: getQuotesList,
  onFilterChange,
  onPagenatationChange
};
