import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { OrderDetailPage } from "./OrderDetailPage";

export default connect(selector, actions)(OrderDetailPage);
