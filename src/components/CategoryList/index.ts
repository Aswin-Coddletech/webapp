import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { CategoryList } from "./CategoryList";

export default connect(selector, actions)(CategoryList);
