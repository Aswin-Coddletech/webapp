import { getPayOrdersList } from "src/redux/loans/actions";
import {
  onSearchFilterChange,
  onPagenatationChange
} from "src/redux/utils/actions";

import { userAccountDetail } from "src/redux/user-account/actions";

export default {
  getUser: userAccountDetail,
  getPayOrdersList,
  onInit: getPayOrdersList,
  onRefresh: getPayOrdersList,
  onSearchFilterChange,
  onPagenatationChange
};
