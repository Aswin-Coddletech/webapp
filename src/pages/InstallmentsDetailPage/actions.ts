import {
  getInstallmentData,
  getInstallmentPaymentData,
} from "src/redux/loans/actions";

export default {
  getInstallmentPaymentData: getInstallmentPaymentData,
  onRefresh: getInstallmentData,
  getInstallmentData: getInstallmentData,
};
