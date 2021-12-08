import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { TableList } from "./TableList";

export default connect(selector, actions)(TableList);
