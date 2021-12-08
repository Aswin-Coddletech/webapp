import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { ProductDetailPage } from "./ProductDetailPage";

export default connect(selector, actions)(ProductDetailPage);
