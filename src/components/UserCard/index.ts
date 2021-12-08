import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { UserCard } from "./UserCard";

export default connect(selector, actions)(UserCard);
