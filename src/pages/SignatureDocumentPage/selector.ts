import { createStructuredSelector } from "reselect";
import {
  onFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";
import { IRootState } from "src/redux/reducer";

import {
  quotesListSelector,
  loadingSelector
} from "src/redux/signature-document/selectors";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import { ISignatureDocumentPageData } from "./SignatureDocumentPage";

export default createStructuredSelector<IRootState, ISignatureDocumentPageData>(
  {
    list: quotesListSelector,
    loading: loadingSelector,
    userAccount: userAccountSelector,
    userAccountLoading: userAccountLoadingSelector,
    filterValue: onFilterChangeSelector,
    currentPage: onPaginationChangeSelector
  }
);
