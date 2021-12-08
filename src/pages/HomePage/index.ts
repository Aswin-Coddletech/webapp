import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { HomePage } from "./HomePage";

export default connect(selector, actions)(HomePage);
