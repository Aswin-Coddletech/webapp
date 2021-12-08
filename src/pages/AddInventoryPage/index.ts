import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { AddInventoryPage } from "./AddInventoryPage";

export default connect(selector, actions)(AddInventoryPage);
