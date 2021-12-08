import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { BelongingsList } from "./BelongingsList";

export default connect(selector, actions)(BelongingsList);
