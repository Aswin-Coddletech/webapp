import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { ManageUserAccountPage } from "./ManageUserAccountPage";

export default connect(selector, actions)(ManageUserAccountPage);
