import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { ImageSelectAndDetect } from "./ImageSelectAndDetect";

export default connect(selector, actions)(ImageSelectAndDetect) as any;
