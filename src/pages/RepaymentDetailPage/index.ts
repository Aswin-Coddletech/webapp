import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { RepaymentDetailPage } from "./RepaymentDetailPage";
export default connect(selector, actions)(RepaymentDetailPage);
