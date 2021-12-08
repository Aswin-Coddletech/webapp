import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { BrandList } from "./BrandList";

export default connect(selector, actions)(BrandList);
