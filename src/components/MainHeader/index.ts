import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { MainHeader } from "./MainHeader";

export default connect(selector, actions)(MainHeader);
