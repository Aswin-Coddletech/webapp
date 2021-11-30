import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { DeviceLockingDetailPage } from "./DeviceLockingDetailPage";

export default connect(selector, actions)(DeviceLockingDetailPage);
