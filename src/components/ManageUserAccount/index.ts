import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { ManageUserAccount } from "./ManageUserAccount";

export default connect(selector, actions)(ManageUserAccount);
