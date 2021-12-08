import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { KycStatusPage } from "./KycStatusPage";

export default connect(selector, actions)(KycStatusPage);
