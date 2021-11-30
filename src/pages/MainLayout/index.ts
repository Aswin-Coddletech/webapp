import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { MainLayout } from "./MainLayout";

export default connect(selector, actions)(MainLayout);
