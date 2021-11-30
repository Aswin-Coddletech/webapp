import { getQuotesList, inspectionComplete } from "src/redux/quotes/actions";

import { onFilterChange, onPagenatationChange } from "src/redux/utils/actions";
import { userAccountDetail } from "src/redux/user-account/actions";

export default {
  getUser: userAccountDetail,
  inspectionComplete,
  getQuotesList,
  onInit: getQuotesList,
  onRefresh: getQuotesList,
  onFilterChange,
  onPagenatationChange
};
