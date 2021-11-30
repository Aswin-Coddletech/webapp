import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { InstallmentsDetailPage } from "./InstallmentsDetailPage";

export default connect(selector, actions)(InstallmentsDetailPage);
