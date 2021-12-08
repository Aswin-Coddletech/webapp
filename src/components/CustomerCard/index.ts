import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { CustomerCard } from "./CustomerCard";

export default connect(selector, actions)(CustomerCard);
