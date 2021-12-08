import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { NuovoEnrollmentsDetailPage } from "./NuovoEnrollmentsDetailPage";

export default connect(selector, actions)(NuovoEnrollmentsDetailPage);
