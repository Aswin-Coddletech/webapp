import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { DisbursalCard } from "./DisbursalCard";

export default connect(selector, actions)(DisbursalCard);
