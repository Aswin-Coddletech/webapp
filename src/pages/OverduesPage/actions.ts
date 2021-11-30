import {
  getInstallmentsList,
  getUserOverdueList,
  getLoanOverdueList
} from "src/redux/loans/actions";
import {
  onSearchFilterChange,
  onPagenatationChange
} from "src/redux/utils/actions";

import { userAccountDetail } from "src/redux/user-account/actions";

export default {
  getUser: userAccountDetail,
  getInstallmentsList,
  getUserOverdueList,
  getLoanOverdueList,
  onInit: getInstallmentsList,
  onSearchFilterChange,
  onPagenatationChange
  //onRefresh: getInstallmentsList,
};
