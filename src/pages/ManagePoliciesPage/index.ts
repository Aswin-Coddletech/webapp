import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { ManagePoliciesPage } from "./ManagePoliciesPage";

export default connect(selector, actions)(ManagePoliciesPage);
