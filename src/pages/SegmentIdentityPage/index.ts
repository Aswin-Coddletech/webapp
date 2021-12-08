import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { SegmentIdentityPage } from "./SegmentIdentityPage";

export default connect(selector, actions)(SegmentIdentityPage);
