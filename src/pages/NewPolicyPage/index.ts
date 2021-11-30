import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { NewPolicyPage } from "./NewPolicyPage";

export default connect(selector, actions)(NewPolicyPage);
