import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { DeviceLockingPage } from "./DeviceLockingPage";

export default connect(selector, actions)(DeviceLockingPage);
