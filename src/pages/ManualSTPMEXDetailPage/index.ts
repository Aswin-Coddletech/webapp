import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { ManualSTPMEXDetailPage } from "./ManualSTPMEXDetailPage";

export default connect(selector, actions)(ManualSTPMEXDetailPage);
