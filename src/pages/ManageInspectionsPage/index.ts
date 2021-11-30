import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { ManageInspectionsPage } from "./ManageInspectionsPage";

export default connect(selector, actions)(ManageInspectionsPage);
