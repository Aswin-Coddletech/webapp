import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { ProductPage } from "./ProductPage";

export default connect(selector, actions)(ProductPage);
