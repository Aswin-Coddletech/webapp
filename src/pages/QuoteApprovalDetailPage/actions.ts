import {
  getQuote,
  approveQuote,
  rejectedQuote,
} from "src/redux/quotes/actions";

export default {
  getQuote,
  approveQuote,
  rejectedQuote,
  refreshQuote: getQuote,
};
