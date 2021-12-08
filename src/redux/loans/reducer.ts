import { combineReducers } from "redux";

import * as actions from "./actions";

import {
  ILoan,
  IDisbursal,
  IInstallment
} from "src/interfaces/Loans.interface";
import {
  IOrder,
  IInstallmentPayment,
  IPayment
} from "src/interfaces/Payment.interface";

export interface ILoanState {
  loansList: ILoan[];
  loan: ILoan;
  insertCollateralItemsSuccess: boolean;
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  submitSuccess: string;
  order: IOrder;
  payOrder: IDisbursal;
  disbursalList: IDisbursal[];
  disbursalBBVAList: IDisbursal[];
  createPayOrderSuccess: string;
  payOrdersList: ILoan[];
  disbursal: IDisbursal;
  saveSTPMEXSuccess: string;
  saveBBVASuccess: string;
  installemntData: IInstallment[];
  installmentsList: IInstallment[];
  userOverrdueList: IInstallment[];
  loanOverrdueList: IInstallment[];
  installemntPaymentData: IInstallmentPayment[];
  paymentDetail: IPayment;
  paymentList: IPayment[];
}

const reducer = combineReducers<ILoanState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.SUBMIT_LOAN_SUCCESS:
        //success means not loading
        return false;
      case actions.SUBMIT_LOAN_FAILURE:
        //failure means not loading
        return false;
      case actions.SUBMIT_LOAN_REQUEST:
        //request means loading is true as some backend call is happenning
        return true;
      case actions.LOANS_LIST_SUCCESS:
        return false;
      case actions.LOANS_LIST_FAILURE:
        return false;
      case actions.LOANS_LIST_REQUEST:
        return true;
      case actions.LOAN_SUCCESS:
        return false;
      case actions.LOAN_FAILURE:
        return false;
      case actions.LOAN_REQUEST:
        return true;
      case actions.CHANGE_LOAN_STATUS_SUCCESS:
        return false;
      case actions.CHANGE_LOAN_STATUS_FAILURE:
        return false;
      case actions.CHANGE_LOAN_STATUS_REQUEST:
        return true;
      case actions.INSPECTION_COMPLETE_SUCCESS:
        return false;
      case actions.INSPECTION_COMPLETE_FAILURE:
        return false;
      case actions.INSPECTION_COMPLETE_REQUEST:
        return true;
      case actions.SUBMIT_PAYORDER_SUCCESS:
        return false;
      case actions.SUBMIT_PAYORDER_FAILURE:
        return false;
      case actions.SUBMIT_PAYORDER_REQUEST:
        return true;
      case actions.PAYORDERS_LIST_SUCCESS:
        return false;
      case actions.PAYORDERS_LIST_FAILURE:
        return false;
      case actions.PAYORDERS_LIST_REQUEST:
        return true;
      case actions.SAVE_MANUAL_STPMEX_SUCCESS:
        return false;
      case actions.SAVE_MANUAL_STPMEX_FAILURE:
        return false;
      case actions.SAVE_MANUAL_STPMEX_REQUEST:
        return true;
      case actions.SAVE_MANUAL_BBVA_SUCCESS:
        return false;
      case actions.SAVE_MANUAL_BBVA_FAILURE:
        return false;
      case actions.SAVE_MANUAL_BBVA_REQUEST:
        return true;
      case actions.DISBURSAL_SUCCESS:
        return false;
      case actions.DISBURSAL_FAILURE:
        return false;
      case actions.DISBURSAL_REQUEST:
        return true;
      case actions.PAYORDER_SUCCESS:
        return false;
      case actions.PAYORDER_FAILURE:
        return false;
      case actions.PAYORDER_REQUEST:
        return true;
      case actions.INSTALLMENTS_LIST_SUCCESS:
        return false;
      case actions.INSTALLMENTS_LIST_FAILURE:
        return false;
      case actions.INSTALLMENTS_LIST_REQUEST:
        return true;
      case actions.USER_OVERDUES_LIST_SUCCESS:
        return false;
      case actions.USER_OVERDUES_LIST_FAILURE:
        return false;
      case actions.USER_OVERDUES_LIST_REQUEST:
        return true;
      case actions.LOAN_OVERDUES_LIST_SUCCESS:
        return false;
      case actions.LOAN_OVERDUES_LIST_FAILURE:
        return false;
      case actions.LOAN_OVERDUES_LIST_REQUEST:
        return true;
      case actions.LOAN_INSTALLMENT_DATA_SUCCESS:
        return false;
      case actions.LOAN_INSTALLMENT_DATA_FAILURE:
        return false;
      case actions.LOAN_INSTALLMENT_DATA_REQUEST:
        return true;
      case actions.LOAN_INSTALLMENT_PAYMENT_DATA_SUCCESS:
        return false;
      case actions.LOAN_INSTALLMENT_PAYMENT_DATA_FAILURE:
        return false;
      case actions.LOAN_INSTALLMENT_PAYMENT_DATA_REQUEST:
        return true;
      case actions.PAYEMENT_DETAIL_SUCCESS:
        return false;
      case actions.PAYEMENT_DETAIL_FAILURE:
        return false;
      case actions.PAYEMENT_DETAIL_REQUEST:
        return true;
      case actions.PAYMENT_LIST_SUCCESS:
        return false;
      case actions.PAYMENT_LIST_FAILURE:
        return false;
      case actions.PAYMENT_LIST_REQUEST:
        return true;
      default:
        return state;
    }
  },

  loansList(state: ILoan[] = [], action): ILoan[] {
    switch (action.type) {
      case actions.LOANS_LIST_SUCCESS:
        return action.data;
      case actions.LOANS_LIST_FAILURE:
        return [];
      default:
        return state;
    }
  },
  disbursalList(state: IDisbursal[] = [], action): IDisbursal[] {
    switch (action.type) {
      case actions.DISBURSAL_LIST_SUCCESS:
        return action.data;
      case actions.DISBURSAL_LIST_FAILURE:
        return [];
      default:
        return state;
    }
  },
  disbursalBBVAList(state: IDisbursal[] = [], action): IDisbursal[] {
    switch (action.type) {
      case actions.DISBURSAL_BBVA_LIST_SUCCESS:
        return action.data;
      case actions.DISBURSAL_BBVA_LIST_FAILURE:
        return [];
      default:
        return state;
    }
  },
  total(state = 0, action) {
    switch (action.type) {
      case actions.LOANS_LIST_SUCCESS:
        return action.data.length;
      default:
        return state;
    }
  },
  page(state = 1, action) {
    switch (action.type) {
      case actions.CHANGE_PAGE:
        return action.page;
      default:
        return state;
    }
  },
  pageSize(state = 10, action) {
    switch (action.type) {
      case actions.CHANGE_PAGE_SIZE:
        return action.pageSize;
      default:
        return state;
    }
  },
  disbursal(state = {}, action) {
    switch (action.type) {
      case actions.DISBURSAL_SUCCESS:
        return action.data;
      case actions.DISBURSAL_FAILURE:
        return {};
      case actions.SAVE_MANUAL_BBVA_SUCCESS:
        return action.data;
      case actions.SAVE_MANUAL_STPMEX_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },
  payOrder(state = {}, action) {
    switch (action.type) {
      case actions.PAYORDER_SUCCESS:
        return action.data;
      case actions.PAYORDER_FAILURE:
        return {};
      default:
        return state;
    }
  },
  loan(state = {}, action) {
    switch (action.type) {
      case actions.CHANGE_LOAN:
        return action.payload;
      case actions.LOAN_SUCCESS:
        return action.data;
      case actions.SUBMIT_LOAN_SUCCESS:
        console.log(
          "in reducer.............for SUBMIT_LOAN_SUCCESS",
          action.data,
          action.data.loan
        );
        if (typeof action.data["loan"] === "undefined") {
          console.log("returning action.data");
          return action.data;
        } else {
          console.log("returning action.data.loan");
          return action.data.loan;
        }
      case actions.APPROVE_LOAN_SUCCESS:
        console.log("action data", action.data);
        return action.data;
      case action.RESET_LOAN:
        return {};
      case action.LOAN_FAILURE:
        return {};
      default:
        return state;
    }
  },
  insertCollateralItemsSuccess(state = false, action) {
    switch (action.type) {
      case actions.INSERT_COLLATERALITEMS_TO_LOAN_SUCCESS:
        return true;
      case actions.INSERT_COLLATERALITEMS_TO_LOAN_FAILURE:
        return false;
      case actions.INSERT_COLLATERALITEMS_TO_LOAN_REQUEST:
        return false;
      default:
        return state;
    }
  },
  submitSuccess(state = "", action) {
    switch (action.type) {
      case actions.SUBMIT_LOAN_SUCCESS:
        return "YES";
      case actions.SUBMIT_LOAN_FAILURE:
        return "NO";
      case actions.SUBMIT_LOAN_REQUEST:
        return "REQUESTED";
      case actions.RESET_SUBMIT_SUCCESS:
        return "";
      default:
        return state;
    }
  },
  saveSTPMEXSuccess(state = "", action) {
    switch (action.type) {
      case actions.SAVE_MANUAL_STPMEX_SUCCESS:
        return "OK";
      case actions.SAVE_MANUAL_STPMEX_FAILURE:
        return "ERROR";
      default:
        return state;
    }
  },
  saveBBVASuccess(state = "", action) {
    switch (action.type) {
      case actions.SAVE_MANUAL_BBVA_SUCCESS:
        return "OK";
      case actions.SAVE_MANUAL_BBVA_FAILURE:
        return "ERROR";
      default:
        return state;
    }
  },
  createPayOrderSuccess(state = "", action) {
    switch (action.type) {
      case actions.SUBMIT_PAYORDER_SUCCESS:
        return "OK";
      case actions.SUBMIT_PAYORDER_FAILURE:
        return "ERROR";
      default:
        return state;
    }
  },
  order(state = {}, action) {
    switch (action.type) {
      case actions.SUBMIT_LOAN_SUCCESS:
        // return action.data.order;
        return state;
      default:
        return state;
    }
  },
  payOrdersList(state: ILoan[] = [], action): ILoan[] {
    switch (action.type) {
      case actions.PAYORDERS_LIST_SUCCESS:
        return action.data;
      case actions.PAYORDERS_LIST_FAILURE:
        return [];
      default:
        return state;
    }
  },
  installmentsList(state: IInstallment[] = [], action): IInstallment[] {
    switch (action.type) {
      case actions.INSTALLMENTS_LIST_SUCCESS:
        return action.data;
      case actions.INSTALLMENTS_LIST_FAILURE:
        return [];

      case actions.USER_OVERDUES_LIST_SUCCESS:
        console.log("userOverrdueList", action.data);
        return action.data;
      case actions.USER_OVERDUES_LIST_FAILURE:
        return [];

      case actions.LOAN_OVERDUES_LIST_SUCCESS:
        console.log("LoanOverrdueList", action.data);
        return action.data;
      case actions.LOAN_OVERDUES_LIST_FAILURE:
        return [];
      default:
        return state;
    }
  },
  installemntData(state: IInstallment[] = [], action): IInstallment[] {
    switch (action.type) {
      case actions.LOAN_INSTALLMENT_DATA_SUCCESS:
        return action.data;
      case actions.LOAN_INSTALLMENT_DATA_FAILURE:
        return [];
      default:
        return state;
    }
  },
  installemntPaymentData(
    state: IInstallmentPayment[] = [],
    action
  ): IInstallmentPayment[] {
    switch (action.type) {
      case actions.LOAN_INSTALLMENT_PAYMENT_DATA_SUCCESS:
        return action.data;
      case actions.LOAN_INSTALLMENT_PAYMENT_DATA_FAILURE:
        return [];
      default:
        return state;
    }
  },
  userOverrdueList(state: IInstallment[] = [], action): IInstallment[] {
    switch (action.type) {
      case actions.USER_OVERDUES_LIST_SUCCESS:
        console.log("userOverrdueList", action.data);
        return action.data;
      case actions.USER_OVERDUES_LIST_FAILURE:
        return [];
      default:
        return state;
    }
  },
  loanOverrdueList(state: IInstallment[] = [], action): IInstallment[] {
    switch (action.type) {
      case actions.LOAN_OVERDUES_LIST_SUCCESS:
        console.log("LoanOverrdueList", action.data);
        return action.data;
      case actions.LOAN_OVERDUES_LIST_FAILURE:
        return [];
      default:
        return state;
    }
  },
  paymentDetail(state = {}, action) {
    switch (action.type) {
      case actions.PAYEMENT_DETAIL_SUCCESS:
        //console.log("LoanOverrdueList", action.data);
        return action.data;
      case actions.PAYEMENT_DETAIL_FAILURE:
        return {};
      default:
        return state;
    }
  },
  paymentList(state: IPayment[] = [], action): IPayment[] {
    switch (action.type) {
      case actions.PAYMENT_LIST_SUCCESS:
        return action.data;
      case actions.PAYMENT_LIST_FAILURE:
        return [];
      default:
        return state;
    }
  }
});
export default { [actions.prefix]: reducer };
