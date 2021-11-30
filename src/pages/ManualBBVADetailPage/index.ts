import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { ManualBBVADetailPage } from "./ManualBBVADetailPage";

export default connect(selector, actions)(ManualBBVADetailPage);
