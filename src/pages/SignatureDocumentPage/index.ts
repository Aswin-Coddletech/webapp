import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { SignatureDocumentPage } from "./SignatureDocumentPage";

export default connect(selector, actions)(SignatureDocumentPage);
