import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { LoanPickup } from "./LoanPickup";

export default connect(selector, actions)(LoanPickup);
