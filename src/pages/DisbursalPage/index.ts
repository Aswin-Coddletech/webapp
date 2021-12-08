import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { DisbursalPage } from "./DisbursalPage";

export default connect(selector, actions)(DisbursalPage);
