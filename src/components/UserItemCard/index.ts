import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { UserItemCard } from "./UserItemCard";

export default connect(selector, actions)(UserItemCard);
