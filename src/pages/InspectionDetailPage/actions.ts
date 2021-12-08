import {
  getQuote,
  inspectionComplete,
  saveObservation
} from "src/redux/quotes/actions";
import { getInstallmentsList, getLoansList } from "src/redux/loans/actions";
import { getdeviceLockList } from "src/redux/user-items/actions";
import { onPagenatationChange } from "src/redux/utils/actions";

export default {
  inspectionComplete,
  getInspection: getQuote,
  observationInfo: saveObservation,
  getInstallmentsList,
  getLoansList,
  getdeviceLockList,
  onPagenatationChange
};
