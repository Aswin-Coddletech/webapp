import { getQuotesList } from "src/redux/quotes/actions";
import { userAccountDetail } from "src/redux/user-account/actions";
import { onFilterChange, onPagenatationChange } from "src/redux/utils/actions";

export default {
  getUser: userAccountDetail,
  getQuotesList,
  onInit: getQuotesList,
  onFilterChange,
  onPagenatationChange
};
