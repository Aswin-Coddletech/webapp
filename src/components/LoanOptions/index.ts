import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { LoanOptions } from "./LoanOptions";

export default connect(selector, actions)(LoanOptions);
