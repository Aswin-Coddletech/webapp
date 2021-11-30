import {
  resetKyc,
  userAccountDetail,
  verifyKyc,
  clearResetKyc,
  clearVerifyKyc
} from "src/redux/user-account/actions";
import { getInstallmentsList, getLoansList } from "src/redux/loans/actions";
import { getdeviceLockList } from "src/redux/user-items/actions";

export default {
  getUser: userAccountDetail,
  resetKyc: resetKyc,
  verifyKyc: verifyKyc,
  clearResetKyc,
  clearVerifyKyc,
  getInstallmentsList,
  getLoansList,
  getdeviceLockList
};
