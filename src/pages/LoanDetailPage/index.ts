import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { LoanDetailPage } from "./LoanDetailPage";

export default connect(selector, actions)(LoanDetailPage);
