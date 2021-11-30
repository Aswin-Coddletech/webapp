import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { PayOrdersPage } from "./PayOrdersPage";

export default connect(selector, actions)(PayOrdersPage);
