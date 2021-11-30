import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { ItemCondition } from "./ItemCondition";

export default connect(selector, actions)(ItemCondition);
