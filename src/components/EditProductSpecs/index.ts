import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { EditProductSpecs } from "./EditProductSpecs";

export default connect(selector, actions)(EditProductSpecs) as any;
