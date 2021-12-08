import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selectors";

import { SellerCard } from "./SellerCard";

export default connect(selector, actions)(SellerCard);
