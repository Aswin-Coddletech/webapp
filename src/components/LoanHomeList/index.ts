import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { LoanHomeList } from "./LoanHomeList";

export default connect(selector, actions)(LoanHomeList);
