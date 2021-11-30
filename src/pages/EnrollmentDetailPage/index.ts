import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { EnrollmentDetailPage } from "./EnrollmentDetailPage";

export default connect(selector, actions)(EnrollmentDetailPage);
