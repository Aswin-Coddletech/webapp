import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { QuoteApprovalDetailPage } from "./QuoteApprovalDetailPage";

export default connect(selector, actions)(QuoteApprovalDetailPage);
