import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { ShopPage } from "./ShopPage";

export default connect(selector, actions)(ShopPage);
