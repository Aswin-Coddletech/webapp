import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { OverduesPage } from "./OverduesPage";

export default connect(selector, actions)(OverduesPage);
