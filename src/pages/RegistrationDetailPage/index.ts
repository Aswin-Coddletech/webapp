import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { RegistartionDetailPage } from "./RegistrationDetailPage";

export default connect(selector, actions)(RegistartionDetailPage);
