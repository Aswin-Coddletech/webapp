import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  quoteSelector
} from "src/redux/signature-document/selectors";
import {
  approvedUserSelector,
  inspectedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { ISignatureDocumentDetailPageData } from "./SignatureDocumentDetailPage";

export default createStructuredSelector<
  IRootState,
  ISignatureDocumentDetailPageData
>({
  loading: loadingSelector,
  quote: quoteSelector,
  userAccount: userAccountSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector
});
