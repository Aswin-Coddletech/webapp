import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { DisbursalDetailPage } from "./DisbursalDetailPage";

export default connect(selector, actions)(DisbursalDetailPage);
