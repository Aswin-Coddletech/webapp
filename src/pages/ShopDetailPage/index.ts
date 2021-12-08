import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { ShopDetailPage } from "./ShopDetailPage";

export default connect(selector, actions)(ShopDetailPage);
