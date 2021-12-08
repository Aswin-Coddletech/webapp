import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { ProductCard } from "./ProductCard";

export default connect(selector, actions)(ProductCard);
