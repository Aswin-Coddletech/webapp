import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { LoanCard } from "./LoanCard";

export default connect(selector, actions)(LoanCard);
