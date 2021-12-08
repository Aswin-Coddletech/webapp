import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { InspectionDetailPage } from "./InspectionDetailPage";

export default connect(selector, actions)(InspectionDetailPage);
