import { ILoan } from "src/interfaces/Loans.interface";

export const prefix = "quotes";

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const CHANGE_LOAN = `${prefix}/CHANGE_LOAN`;
export const changeQuote = (loan: ILoan) => ({
  type: CHANGE_LOAN,
  payload: loan
});

export const QUOTES_FILTER_LIST_REQUEST = `${prefix}/QUOTES_FILTER_LIST_REQUEST`;
export const QUOTES_FILTER_LIST_SUCCESS = `${prefix}/QUOTES_FILTER_LIST_SUCCESS`;
export const QUOTES_FILTER_LIST_FAILURE = `${prefix}/QUOTES_FILTER_LIST_FAILURE`;

export const getQuotesFilterList = (filter: string, search: string) => ({
  promise: (api: any) => api.quotes.quotesFilterList(filter, search),
  types: [
    QUOTES_FILTER_LIST_REQUEST,
    QUOTES_FILTER_LIST_SUCCESS,
    QUOTES_FILTER_LIST_FAILURE
  ]
});

export const QUOTES_LIST_REQUEST = `${prefix}/QUOTES_LIST_REQUEST`;
export const QUOTES_LIST_SUCCESS = `${prefix}/QUOTES_LIST_SUCCESS`;
export const QUOTES_LIST_FAILURE = `${prefix}/QUOTES_LIST_FAILURE`;

export const getQuotesList = (status: any) => ({
  promise: (api: any) => api.quotes.quotesList(status),
  types: [QUOTES_LIST_REQUEST, QUOTES_LIST_SUCCESS, QUOTES_LIST_FAILURE]
});

// QUOTE FILTERS ---
export const QUOTE_SEARCH_FILTER_CHANGE = `${prefix}/QUOTE_SEARCH_FILTER_CHANGE`;
export const onSearchFilterChange = (filter: any) => ({
  payload: filter,
  type: QUOTE_SEARCH_FILTER_CHANGE
});

export const QUOTES_FILTER_CHANGE = `${prefix}/QUOTES_FILTER_CHANGE`;
export const onFilterChange = (filter: string) => ({
  payload: filter,
  type: QUOTES_FILTER_CHANGE
});

export const QUOTE_REQUEST = `${prefix}/QUOTE_REQUEST`;
export const QUOTE_SUCCESS = `${prefix}/QUOTE_SUCCESS`;
export const QUOTE_FAILURE = `${prefix}/QUOTE_FAILURE`;

export const getQuote = (quoteId: any) => ({
  promise: (api: any) => api.quotes.quote(quoteId),
  types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
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

export const APPROVE_QUOTE = `${prefix}/APPROVE_QUOTE`;

export const CHANGE_QUOTE_STATUS_REQUEST = `${prefix}/CHANGE_QUOTE_STATUS_REQUEST`;
export const CHANGE_QUOTE_STATUS_SUCCESS = `${prefix}/CHANGE_QUOTE_STATUS_SUCCESS`;
export const CHANGE_QUOTE_STATUS_FAILURE = `${prefix}/CHANGE_QUOTE_STATUS_FAILURE`;

export const APPROVE_QUOTE_REQUEST = `${prefix}/APPROVE_QUOTE_REQUEST`;
export const APPROVE_QUOTE_SUCCESS = `${prefix}/APPROVE_QUOTE_SUCCESS`;
export const APPROVE_QUOTE_FAILURE = `${prefix}/APPROVE_QUOTE_FAILURE`;

export const approveQuote = (quoteId, quoteStatus) => ({
  promise: (api: any) => api.quotes.approveQuote(quoteId, quoteStatus),
  types: [APPROVE_QUOTE_REQUEST, APPROVE_QUOTE_SUCCESS, APPROVE_QUOTE_FAILURE]
});

export const REJECT_QUOTE_REQUEST = `${prefix}/REJECT_QUOTE_REQUEST`;
export const REJECT_QUOTE_SUCCESS = `${prefix}/REJECT_QUOTE_SUCCESS`;
export const REJECT_QUOTE_FAILURE = `${prefix}/REJECT_QUOTE_FAILURE`;

export const rejectedQuote = (
  quoteId,
  quoteStatus,
  rejectedReason,
  rejectionType
) => ({
  promise: (api: any) =>
    api.quotes.rejectQuote(quoteId, quoteStatus, rejectedReason, rejectionType),
  types: [REJECT_QUOTE_REQUEST, REJECT_QUOTE_SUCCESS, REJECT_QUOTE_FAILURE]
});

export const INSPECTION_COMPLETE_REQUEST = `${prefix}/INSPECTION_COMPLETE_REQUEST`;
export const INSPECTION_COMPLETE_SUCCESS = `${prefix}/INSPECTION_COMPLETE_SUCCESS`;
export const INSPECTION_COMPLETE_FAILURE = `${prefix}/INSPECTION_COMPLETE_FAILURE`;

export const inspectionComplete = (quoteId, observation) => ({
  promise: (api: any) => api.quotes.inspectionCompleted(quoteId, observation),
  types: [
    INSPECTION_COMPLETE_REQUEST,
    INSPECTION_COMPLETE_SUCCESS,
    INSPECTION_COMPLETE_FAILURE
  ]
});

export const FR_ENROLLMENT_REQUEST = `${prefix}/FR_ENROLLMENT_REQUEST`;
export const FR_ENROLLMENT_SUCCESS = `${prefix}/FR_ENROLLMENT_SUCCESS`;
export const FR_ENROLLMENT_FAILURE = `${prefix}/FR_ENROLLMENT_FAILURE`;

export const frEnrollment = quoteId => ({
  promise: (api: any) => api.quotes.frEnrollment(quoteId),
  types: [FR_ENROLLMENT_REQUEST, FR_ENROLLMENT_SUCCESS, FR_ENROLLMENT_FAILURE]
});

export const OBSERVATION_REQUEST = `${prefix}/OBSERVATION_REQUEST`;
export const OBSERVATION_SUCCESS = `${prefix}/OBSERVATION_SUCCESS`;
export const OBSERVATION_FAILURE = `${prefix}/OBSERVATION_FAILURE`;

export const saveObservation = observation => ({
  promise: (api: any) => api.quotes.addObservation(observation),
  types: [OBSERVATION_REQUEST, OBSERVATION_SUCCESS, OBSERVATION_FAILURE]
});
