import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { ShopCard } from "./ShopCard";

export default connect(selector, actions)(ShopCard);
