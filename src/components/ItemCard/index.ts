import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { ItemCard } from "./ItemCard";

export default connect(selector, actions)(ItemCard);
