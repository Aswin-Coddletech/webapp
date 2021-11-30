import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { CustomerPage } from "./CustomerPage";

export default connect(selector, actions)(CustomerPage);
