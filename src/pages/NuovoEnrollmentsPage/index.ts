import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { NuovoEnrollmentsPage } from "./NuovoEnrollmentsPage";

export default connect(selector, actions)(NuovoEnrollmentsPage);
