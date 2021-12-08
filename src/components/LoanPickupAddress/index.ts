import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { LoanPickupAddress } from "./LoanPickupAddress";

export default connect(selector, actions)(LoanPickupAddress);
