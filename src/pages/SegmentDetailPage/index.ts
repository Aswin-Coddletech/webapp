import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { SegmentDetailPage } from "./SegmentDetailPage";

export default connect(selector, actions)(SegmentDetailPage);
