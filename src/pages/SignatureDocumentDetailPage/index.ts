import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { SignatureDocumentDetailPage } from "./SignatureDocumentDetailPage";

export default connect(selector, actions)(SignatureDocumentDetailPage);
