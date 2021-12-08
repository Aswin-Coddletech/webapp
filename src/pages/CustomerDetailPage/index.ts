import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { CustomerDetailPage } from "./CustomerDetailPage";

export default connect(selector, actions)(CustomerDetailPage);
