import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { OrderCard } from "./OrderCard";

export default connect(selector, actions)(OrderCard);
