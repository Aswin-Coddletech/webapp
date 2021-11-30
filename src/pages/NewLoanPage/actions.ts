import {
  resetSubmitSuccess,
  submitLoan,
  resetLoan
} from "src/redux/loans/actions";

export default {
  onInit: resetSubmitSuccess,
  onSubmit: submitLoan,
  onNewLoanInit: resetLoan
};
