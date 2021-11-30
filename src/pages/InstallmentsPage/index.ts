import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { InstallmentsPage } from "./InstallmentsPage";

export default connect(selector, actions)(InstallmentsPage);
