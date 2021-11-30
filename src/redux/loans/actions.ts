import { ILoan } from "src/interfaces/Loans.interface";

export const prefix = "loans";

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const LOANS_LIST_REQUEST = `${prefix}/LOANS_LIST_REQUEST`;
export const LOANS_LIST_SUCCESS = `${prefix}/LOANS_LIST_SUCCESS`;
export const LOANS_LIST_FAILURE = `${prefix}/LOANS_LIST_FAILURE`;

export const getLoansList = (filter: any, serach: any) => ({
  promise: (api: any) => api.loans.loansList(filter, serach),
  types: [LOANS_LIST_REQUEST, LOANS_LIST_SUCCESS, LOANS_LIST_FAILURE]
});

export const CHANGE_LOAN = `${prefix}/CHANGE_LOAN`;
export const changeLoan = (loan: ILoan) => ({
  type: CHANGE_LOAN,
  payload: loan
});

export const LOAN_REQUEST = `${prefix}/LOAN_REQUEST`;
export const LOAN_SUCCESS = `${prefix}/LOAN_SUCCESS`;
export const LOAN_FAILURE = `${prefix}/LOAN_FAILURE`;

export const getLoan = (quoteId: string) => ({
  promise: (api: any) => api.loans.loan(quoteId),
  types: [LOAN_REQUEST, LOAN_SUCCESS, LOAN_FAILURE]
});

export const INSERT_COLLATERALITEMS_TO_LOAN_REQUEST = `${prefix}/INSERT_COLLATERALITEMS_TO_LOAN_REQUEST`;
export const INSERT_COLLATERALITEMS_TO_LOAN_SUCCESS = `${prefix}/INSERT_COLLATERALITEMS_TO_LOAN_SUCCESS`;
export const INSERT_COLLATERALITEMS_TO_LOAN_FAILURE = `${prefix}/INSERT_COLLATERALITEMS_TO_LOAN_FAILURE`;

export const insertWarrantedItems = (data: {}) => ({
  promise: (api: any) => api.loans.insertwarranteditemstoloan(data),
  types: [
    INSERT_COLLATERALITEMS_TO_LOAN_REQUEST,
    INSERT_COLLATERALITEMS_TO_LOAN_SUCCESS,
    INSERT_COLLATERALITEMS_TO_LOAN_FAILURE
  ]
});

export const CHANGE_PAGE = `${prefix}/CHANGE_PAGE`;
export const changePagination = (page: any) => ({
  type: CHANGE_PAGE,
  page
});

export const CHANGE_PAGE_SIZE = `${prefix}/CHANGE_PAGE_SIZE`;
export const changePageSize = (_: any, pageSize: any) => ({
  type: CHANGE_PAGE_SIZE,
  pageSize
});

export const SUBMIT_LOAN_REQUEST = `${prefix}/SUBMIT_LOAN_REQUEST`;
export const SUBMIT_LOAN_SUCCESS = `${prefix}/SUBMIT_LOAN_SUCCESS`;
export const SUBMIT_LOAN_FAILURE = `${prefix}/SUBMIT_LOAN_FAILURE`;

export const submitLoan = pageData => ({
  promise: (api: any) => api.loans.createloan(pageData),
  types: [SUBMIT_LOAN_REQUEST, SUBMIT_LOAN_SUCCESS, SUBMIT_LOAN_FAILURE]
});

export const RESET_SUBMIT_SUCCESS = `${prefix}/RESET_SUBMIT_SUCCESS`;
export const resetSubmitSuccess = () => ({
  type: RESET_SUBMIT_SUCCESS
});

export const RESET_LOAN = `${prefix}/RESET_LOAN`;
export const resetLoan = () => ({
  type: RESET_LOAN
});

export const APPROVE_LOAN = `${prefix}/APPROVE_LOAN`;

export const CHANGE_LOAN_STATUS_REQUEST = `${prefix}/CHANGE_LOAN_STATUS_REQUEST`;
export const CHANGE_LOAN_STATUS_SUCCESS = `${prefix}/CHANGE_LOAN_STATUS_SUCCESS`;
export const CHANGE_LOAN_STATUS_FAILURE = `${prefix}/CHANGE_LOAN_STATUS_FAILURE`;

export const APPROVE_LOAN_REQUEST = `${prefix}/APPROVE_LOAN_REQUEST`;
export const APPROVE_LOAN_SUCCESS = `${prefix}/APPROVE_LOAN_SUCCESS`;
export const APPROVE_LOAN_FAILURE = `${prefix}/APPROVE_LOAN_FAILURE`;

export const approveLoan = (loanId, loanStatus) => ({
  promise: (api: any) => api.loans.approveLoan(loanId, loanStatus),
  types: [
    CHANGE_LOAN_STATUS_REQUEST,
    CHANGE_LOAN_STATUS_SUCCESS,
    CHANGE_LOAN_STATUS_FAILURE
  ]
});

export const INSPECTION_COMPLETE_REQUEST = `${prefix}/INSPECTION_COMPLETE_REQUEST`;
export const INSPECTION_COMPLETE_SUCCESS = `${prefix}/INSPECTION_COMPLETE_SUCCESS`;
export const INSPECTION_COMPLETE_FAILURE = `${prefix}/INSPECTION_COMPLETE_FAILURE`;

export const inspectionComplete = loanId => ({
  promise: (api: any) => api.loans.inspectionCompleted(loanId),
  types: [
    INSPECTION_COMPLETE_REQUEST,
    INSPECTION_COMPLETE_SUCCESS,
    INSPECTION_COMPLETE_FAILURE
  ]
});

export const SUBMIT_PAYORDER_REQUEST = `${prefix}/SUBMIT_PAYORDER_REQUEST`;
export const SUBMIT_PAYORDER_SUCCESS = `${prefix}/SUBMIT_PAYORDER_SUCCESS`;
export const SUBMIT_PAYORDER_FAILURE = `${prefix}/SUBMIT_PAYORDER_FAILURE`;

export const submitPayOrder = (loanId, processType) => ({
  promise: (api: any) => api.loans.submitPayOrder(loanId, processType),
  types: [
    SUBMIT_PAYORDER_REQUEST,
    SUBMIT_PAYORDER_SUCCESS,
    SUBMIT_PAYORDER_FAILURE
  ]
});

export const DISBURSAL_LIST_REQUEST = `${prefix}/DISBURSAL_LIST_REQUEST`;
export const DISBURSAL_LIST_SUCCESS = `${prefix}/DISBURSAL_LIST_SUCCESS`;
export const DISBURSAL_LIST_FAILURE = `${prefix}/DISBURSAL_LIST_FAILURE`;

export const getDisbursalList = (type: any) => ({
  promise: (api: any) => api.loans.disbursalList(type),
  types: [
    DISBURSAL_LIST_REQUEST,
    DISBURSAL_LIST_SUCCESS,
    DISBURSAL_LIST_FAILURE
  ]
});

export const DISBURSAL_BBVA_LIST_REQUEST = `${prefix}/DISBURSAL_BBVA_LIST_REQUEST`;
export const DISBURSAL_BBVA_LIST_SUCCESS = `${prefix}/DISBURSAL_BBVA_LIST_SUCCESS`;
export const DISBURSAL_BBVA_LIST_FAILURE = `${prefix}/DISBURSAL_BBVA_LIST_FAILURE`;

export const getDisbursalBBVAList = (type: any) => ({
  promise: (api: any) => api.loans.disbursalList(type),
  types: [
    DISBURSAL_BBVA_LIST_REQUEST,
    DISBURSAL_BBVA_LIST_SUCCESS,
    DISBURSAL_BBVA_LIST_FAILURE
  ]
});

export const PAYORDERS_LIST_REQUEST = `${prefix}/PAYORDERS_LIST_REQUEST`;
export const PAYORDERS_LIST_SUCCESS = `${prefix}/PAYORDERS_LIST_SUCCESS`;
export const PAYORDERS_LIST_FAILURE = `${prefix}/PAYORDERS_LIST_FAILURE`;

export const getPayOrdersList = (filter: any, serach: any) => ({
  promise: (api: any) => api.loans.payOrdersList(filter, serach),
  types: [PAYORDERS_LIST_REQUEST, PAYORDERS_LIST_SUCCESS, LOANS_LIST_FAILURE]
});

export const PAYORDER_REQUEST = `${prefix}/PAYORDER_REQUEST`;
export const PAYORDER_SUCCESS = `${prefix}/PAYORDER_SUCCESS`;
export const PAYORDER_FAILURE = `${prefix}/PAYORDER_FAILURE`;

export const getPayOrder = (payorderId: string) => ({
  promise: (api: any) => api.loans.payOrder(payorderId),
  types: [PAYORDER_REQUEST, PAYORDER_SUCCESS, PAYORDER_FAILURE]
});

export const DISBURSAL_REQUEST = `${prefix}/DISBURSAL_REQUEST`;
export const DISBURSAL_SUCCESS = `${prefix}/DISBURSAL_SUCCESS`;
export const DISBURSAL_FAILURE = `${prefix}/DISBURSAL_FAILURE`;

export const getDisbursal = (disbursalId: string) => ({
  promise: (api: any) => api.loans.disbursal(disbursalId),
  types: [DISBURSAL_REQUEST, DISBURSAL_SUCCESS, DISBURSAL_FAILURE]
});

export const SAVE_MANUAL_STPMEX_REQUEST = `${prefix}/SAVE_MANUAL_STPMEX_REQUEST`;
export const SAVE_MANUAL_STPMEX_SUCCESS = `${prefix}/SAVE_MANUAL_STPMEX_SUCCESS`;
export const SAVE_MANUAL_STPMEX_FAILURE = `${prefix}/SAVE_MANUAL_STPMEX_FAILURE`;

export const saveManualSTPMEXTransaction = (
  disbursalId: any,
  stpmexRegistraOrdenId: any,
  stpmexPayorderSubmittedAt: any,
  stpmexPayorderCompletedAt: any,
  status: any
) => ({
  promise: (api: any) =>
    api.loans.saveManualSTPMEXTransaction(
      disbursalId,
      stpmexRegistraOrdenId,
      stpmexPayorderSubmittedAt,
      stpmexPayorderCompletedAt,
      status
    ),
  types: [
    SAVE_MANUAL_STPMEX_REQUEST,
    SAVE_MANUAL_STPMEX_SUCCESS,
    SAVE_MANUAL_STPMEX_FAILURE
  ]
});

export const SAVE_MANUAL_BBVA_REQUEST = `${prefix}/SAVE_MANUAL_BBVA_REQUEST`;
export const SAVE_MANUAL_BBVA_SUCCESS = `${prefix}/SAVE_MANUAL_BBVA_SUCCESS`;
export const SAVE_MANUAL_BBVA_FAILURE = `${prefix}/SAVE_MANUAL_BBVA_FAILURE`;

export const saveManualBBVATransaction = (
  disbursalId: any,
  bbvaTransactinId: any,
  bbvaTransactinSubmittedAt: any,
  bbvaTransactinCompletedAt: any,
  status: any
) => ({
  promise: (api: any) =>
    api.loans.saveManualBBVATransaction(
      disbursalId,
      bbvaTransactinId,
      bbvaTransactinSubmittedAt,
      bbvaTransactinCompletedAt,
      status
    ),
  types: [
    SAVE_MANUAL_BBVA_REQUEST,
    SAVE_MANUAL_BBVA_SUCCESS,
    SAVE_MANUAL_BBVA_FAILURE
  ]
});

export const INSTALLMENTS_LIST_REQUEST = `${prefix}/INSTALLMENTS_LIST_REQUEST`;
export const INSTALLMENTS_LIST_SUCCESS = `${prefix}/INSTALLMENTS_LIST_SUCCESS`;
export const INSTALLMENTS_LIST_FAILURE = `${prefix}/INSTALLMENTS_LIST_FAILURE`;

export const getInstallmentsList = (filter: string, status: any) => ({
  promise: (api: any) => api.loans.installmentList(filter, status),
  types: [
    INSTALLMENTS_LIST_REQUEST,
    INSTALLMENTS_LIST_SUCCESS,
    INSTALLMENTS_LIST_FAILURE
  ]
});

export const USER_OVERDUES_LIST_REQUEST = `${prefix}/USER_OVERDUES_LIST_REQUEST`;
export const USER_OVERDUES_LIST_SUCCESS = `${prefix}/USER_OVERDUES_LIST_SUCCESS`;
export const USER_OVERDUES_LIST_FAILURE = `${prefix}/USER_OVERDUES_LIST_FAILURE`;

export const getUserOverdueList = (userId: string) => ({
  promise: (api: any) => api.loans.userOverdues(userId),
  types: [
    USER_OVERDUES_LIST_REQUEST,
    USER_OVERDUES_LIST_SUCCESS,
    USER_OVERDUES_LIST_FAILURE
  ]
});

export const LOAN_OVERDUES_LIST_REQUEST = `${prefix}/LOAN_OVERDUES_LIST_REQUEST`;
export const LOAN_OVERDUES_LIST_SUCCESS = `${prefix}/LOAN_OVERDUES_LIST_SUCCESS`;
export const LOAN_OVERDUES_LIST_FAILURE = `${prefix}/LOAN_OVERDUES_LIST_FAILURE`;

export const getLoanOverdueList = (loanId: string) => ({
  promise: (api: any) => api.loans.loanOverdues(loanId),
  types: [
    LOAN_OVERDUES_LIST_REQUEST,
    LOAN_OVERDUES_LIST_SUCCESS,
    LOAN_OVERDUES_LIST_FAILURE
  ]
});

export const LOAN_INSTALLMENT_DATA_REQUEST = `${prefix}/LOAN_INSTALLMENT_DATA_REQUEST`;
export const LOAN_INSTALLMENT_DATA_SUCCESS = `${prefix}/LOAN_INSTALLMENT_DATA_SUCCESS`;
export const LOAN_INSTALLMENT_DATA_FAILURE = `${prefix}/LOAN_INSTALLMENT_DATA_FAILURE`;

export const getInstallmentData = (loanId: string) => ({
  promise: (api: any) => api.loans.installmentDetails(loanId),
  types: [
    LOAN_INSTALLMENT_DATA_REQUEST,
    LOAN_INSTALLMENT_DATA_SUCCESS,
    LOAN_INSTALLMENT_DATA_FAILURE
  ]
});
//payment
export const PAYEMENT_DETAIL_REQUEST = `${prefix}/PAYEMENT_DETAIL_REQUEST`;
export const PAYEMENT_DETAIL_SUCCESS = `${prefix}/PAYEMENT_DETAIL_SUCCESS`;
export const PAYEMENT_DETAIL_FAILURE = `${prefix}/PAYEMENT_DETAIL_FAILURE`;

export const getPayment = (paymentId: any) => ({
  promise: (api: any) => api.loans.repaymentDetail(paymentId),
  types: [
    PAYEMENT_DETAIL_REQUEST,
    PAYEMENT_DETAIL_SUCCESS,
    PAYEMENT_DETAIL_FAILURE
  ]
});

//paymentListing
export const PAYMENT_LIST_REQUEST = `${prefix}/PAYMENT_LIST_REQUEST`;
export const PAYMENT_LIST_SUCCESS = `${prefix}/PAYMENT_LIST_SUCCESS`;
export const PAYMENT_LIST_FAILURE = `${prefix}/PAYMENT_LIST_FAILURE`;

export const getPaymentList = (filter: any, serach: any) => ({
  promise: (api: any) => api.loans.paymentList(filter, serach),
  types: [PAYMENT_LIST_REQUEST, PAYMENT_LIST_SUCCESS, PAYMENT_LIST_FAILURE]
});
export const LOAN_INSTALLMENT_PAYMENT_DATA_REQUEST = `${prefix}/LOAN_INSTALLMENT_PAYMENT_DATA_REQUEST`;
export const LOAN_INSTALLMENT_PAYMENT_DATA_SUCCESS = `${prefix}/LOAN_INSTALLMENT_PAYMENT_DATA_SUCCESS`;
export const LOAN_INSTALLMENT_PAYMENT_DATA_FAILURE = `${prefix}/LOAN_INSTALLMENT_PAYMENT_DATA_FAILURE`;

export const getInstallmentPaymentData = (loanId: string) => ({
  promise: (api: any) => api.loans.installmentPaymentDetails(loanId),
  types: [
    LOAN_INSTALLMENT_PAYMENT_DATA_REQUEST,
    LOAN_INSTALLMENT_PAYMENT_DATA_SUCCESS,
    LOAN_INSTALLMENT_PAYMENT_DATA_FAILURE
  ]
});
