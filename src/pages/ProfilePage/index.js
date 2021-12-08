import { connect } from "react-redux";

import selector from "./selector";

import { ProfilePage } from "./ProfilePage";

export { ProfilePage };

export default connect(selector, {})(ProfilePage);
