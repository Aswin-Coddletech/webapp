import {
  getCategory,
  getBrands,
  getModels,
  getPrice,
  submitQuote,
  resetQuote,
  getInclusion,
  getpickupTimeSlot
} from "../../redux/instant-quote/actions";

export default {
  onInit: getCategory,
  getBrands: getBrands,
  getModels: getModels,
  getPrice: getPrice,
  onQuoteSubmit: submitQuote,
  onNewQuoteInit: resetQuote,
  getInclusion: getInclusion,
  getpickupTimeSlot: getpickupTimeSlot
};
