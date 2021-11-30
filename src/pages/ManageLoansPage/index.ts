import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { ManageLoansPage } from "./ManageLoansPage";

export default connect(selector, actions)(ManageLoansPage);
