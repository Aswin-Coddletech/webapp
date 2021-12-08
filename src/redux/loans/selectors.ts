import { IRootState } from "src/redux/reducer";
import { prefix } from "./actions";

export const loadingSelector = (state: IRootState) => state[prefix].loading;
export const loansListSelector = (state: IRootState) => state[prefix].loansList;
export const loanSelector = (state: IRootState) => state[prefix].loan;
export const totalSelector = (state: IRootState) => state[prefix].total;
export const pageSelector = (state: IRootState) => state[prefix].page;
export const pageSizeSelector = (state: IRootState) => state[prefix].pageSize;

export const submitSuccessSelector = (state: IRootState) =>
  state[prefix].submitSuccess;
export const orderSelector = (state: IRootState) => state[prefix].order;

export const disbursalListSelector = (state: IRootState) =>
  state[prefix].disbursalList;
export const disbursalBBVAListSelector = (state: IRootState) =>
  state[prefix].disbursalBBVAList;
export const createPayOrderSuccessSelector = (state: IRootState) =>
  state[prefix].createPayOrderSuccess;
export const payOrdersListSelector = (state: IRootState) =>
  state[prefix].payOrdersList;
export const payOrderSelector = (state: IRootState) => state[prefix].payOrder;
export const saveSTPMEXSuccessSelector = (state: IRootState) =>
  state[prefix].saveSTPMEXSuccess;
export const saveBBVASuccessSelector = (state: IRootState) =>
  state[prefix].saveBBVASuccess;
export const disbursalSelector = (state: IRootState) => state[prefix].disbursal;
export const installmentsListSelector = (state: IRootState) =>
  state[prefix].installmentsList;
export const installemntDataSelector = (state: IRootState) =>
  state[prefix].installemntData;
export const installemntPaymentDataSelector = (state: IRootState) =>
  state[prefix].installemntPaymentData;
//repaymentDetail
export const paymentDetailSelector = (state: IRootState) =>
  state[prefix].paymentDetail;

export const paymentListSelector = (state: IRootState) =>
  state[prefix].paymentList;
