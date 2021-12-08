import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { LoanRepaymentPage } from "./LoanRepaymentPage";

export default connect(selector, actions)(LoanRepaymentPage);
