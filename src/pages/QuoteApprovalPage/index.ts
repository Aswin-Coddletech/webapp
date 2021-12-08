import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { QuoteApprovalPage } from "./QuoteApprovalPage";

export default connect(selector, actions)(QuoteApprovalPage);
