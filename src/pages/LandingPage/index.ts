import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { LandingPage } from "./LandingPage";

export default connect(selector, actions)(LandingPage);
