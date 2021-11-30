import {
  getLoansList,
  getDisbursalList,
  getDisbursalBBVAList
} from "src/redux/loans/actions";
import { onFilterChange, onPagenatationChange } from "src/redux/utils/actions";

import { userAccountDetail } from "src/redux/user-account/actions";

export default {
  getUser: userAccountDetail,
  getPayOrderNotCreatedList: getLoansList,
  getManulSTPMEXList: getDisbursalList,
  getManualBBVAList: getDisbursalBBVAList,
  onRefresh: getLoansList,
  onFilterChange,
  onPagenatationChange
};
